import json
from flask import Blueprint, request, render_template, flash, session, redirect, url_for
from flask_cors import CORS, cross_origin
from model.modeloUsuario import *
from model.modeloTorneo import *
from model.modeloReglas import *

user = Blueprint('user', __name__, url_prefix='/')

@user.route('/')
def main_view():
    return "Hello world!"

@user.route('/Registro',  methods=('GET', 'POST'))
@cross_origin()
def register_user():
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if name == '' or email == '' or password == '':
        return json.dumps({'error':'Completa todos los campos'})
    else:
        status = add_user(name, email, password, 'participante')
        if(status == 0):
            return json.dumps({'ok': 'Usuario agregado con éxito'})
        elif(status == 4):
            return json.dumps({'error':'Correo ya registrado'})
        else:
            return json.dumps({'error':'No se pudo registrar el usuario'})

@user.route('/Acceso',  methods=('GET', 'POST'))
@cross_origin()      
def read_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == '' or password == '':
        return json.dumps({'error':'Completa todos los campos'})
    else:
        usuario = get_user_by_key(email)
        if(usuario != None):
            print(usuario.correo)
            print(email)
            print(password)
            if(user_check_password(email, password)):
                session['rol'] = usuario.rol
                session['id'] = usuario.idUsuario
                if(usuario.rol == 'superAdministrador'):
                    datos = get_users_by_role('administrador')
                    maxid = get_next_id('administrador')
                    return json.dumps({'nombre': usuario.nombreUsuario, 'role': usuario.rol, 'list': datos, 'maxid': maxid+1})
                if(usuario.rol == 'administrador'):
                    datos = get_torneos()
                    maxid = get_next_idTorneo()
                    rules = get_reglas()
                    return json.dumps({'nombre': usuario.nombreUsuario, 'role': usuario.rol, 'list': datos, 'maxid': maxid+1, 'rules' : rules})
                if(usuario.rol == 'participante'):
                    datos = get_user_info(usuario.idUsuario)
                    return json.dumps({'nombre': usuario.nombreUsuario, 'role': usuario.rol, 'list': datos, 'maxid': usuario.idUsuario})
            return json.dumps({'error':'Contraseña incorrecta'})
        else:
            return json.dumps({'error':'Correo no registrado'})

@user.route('/PaginaPrincipal',  methods=('GET', 'POST'))
@cross_origin()      
def update_data():
    action = request.json.get("action", None)
    print(action)
    if action == '':
        return json.dumps({'error':'Datos insuficientes'})
    if(action == 'deleteUser'):
        id = request.json.get("id", None)
        user = delete_user(id)
        if(user != None):
            datos = get_users_by_role('administrador')
            maxid = get_next_id('administrador')
            return json.dumps({'list': datos, 'maxid' : maxid})
        else:
            return json.dumps({'error': 'No se pudo eliminar el usuario'})
    if(action == 'addAdmin'):
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if name == '' or email == '' or password == '':
            return json.dumps({'error':'Completa todos los campos'})
        else:
            status = add_user(name, email, password, 'administrador')
        if(status == 0):
            datos = get_users_by_role('administrador')
            maxid = get_next_id('administrador')
            return json.dumps({'ok': 'Administrador agregado con éxito', 'list': datos, 'maxid' : maxid})
        elif(status == 4):
            return json.dumps({'error':'Correo ya registrado'})
        else:
            return json.dumps({'error':'No se pudo registrar el administrador'})
    if(action == 'updateAdmin'):
        id = request.json.get("id", None)
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = update_user(id, name, email, password)
        if(user == 0):
            datos = get_users_by_role('administrador')
            maxid = get_next_id('administrador')
            return json.dumps({'data': 'success', 'list' : datos, 'maxid' : maxid})
        if(user == 2):
            return json.dumps({'error': 'Ya existe otro usuario con el mismo correo'})
        else:
            return json.dumps({'error': 'No se pudo actualizar el usuario'})
    if(action == 'addTorneo'):
        num_part = request.json.get("participants", None)
        juego = request.json.get("game", None)
        inicio = request.json.get("initDate", None)
        fin = request.json.get("endDate", None)
        nombre = request.json.get("name", None)
        consola = request.json.get("console", None)
        correo = request.json.get("email", None)
        reglas = request.json.get("rules", None)
        estatus = 'activo'
        torneo = add_torneo(num_part, juego, inicio, fin, nombre, consola, correo, estatus)
        if(torneo != None):
            for regla in reglas:
                add_regla(torneo.idTorneo, regla['rule'])
            datos = get_torneos()
            maxid = get_next_idTorneo()
            reglas = get_reglas()
            return json.dumps({'ok': 'Torneo agregado con éxito', 'list' : datos, 'maxid' : maxid, 'rules' : reglas})
        else:
            return json.dumps({'error': 'No se pudo agregar el torneo'})
    if(action == 'deleteTorneo'):
        id = request.json.get("id", None)
        torneo = delete_torneo(id)
        if(torneo != None):
            datos = get_torneos()

            maxid = get_next_idTorneo()
            rules = get_reglas()
            return json.dumps({'list': datos, 'maxid' : maxid, 'rules' : rules})
        else:
            return json.dumps({'error': 'No se pudo eliminar el torneo'})
    if(action == 'updateTorneo'):
        idTorneo = request.json.get("idTorneo", None)
        num_part = request.json.get("participants", None)
        juego = request.json.get("game", None)
        inicio = request.json.get("initDate", None)
        fin = request.json.get("endDate", None)
        nombre = request.json.get("name", None)
        consola = request.json.get("console", None)
        correo = request.json.get("email", None)
        estatus =  request.json.get("estatus", None)
        print(estatus)
        reglas = request.json.get("rules", None)
        torneo = update_torneo(idTorneo, '', '', num_part, juego, inicio,
                               fin, nombre, consola, correo, estatus)
        update_regla(idTorneo, reglas)
        if(torneo != None):
            datos = get_torneos()
            maxid = get_next_idTorneo()
            rules = get_reglas()
            return json.dumps({'data': 'success', 'list' : datos, 'maxid' : maxid, 'rules' : rules})
        else:
            return json.dumps({'error': 'No se pudo actualizar el torneo'})
    if(action == 'deleteAccount'):
        id = request.json.get("id", None)
        user = delete_user(id)
        if(user != None):
            return json.dumps({'data': 'success'})
        else:
            return json.dumps({'error': 'No se pudo eliminar el usuario'})
    if(action == 'updateUser'):
        id = request.json.get("id", None)
        name = request.json.get("name", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = update_user(id, name, email, password)
        if(user == 0):
            datos = get_user_info(id)
            maxid = id
            return json.dumps({'data': 'success', 'list' : datos, 'maxid' : maxid})
        if(user == 2):
            return json.dumps({'error': 'Ya existe otro usuario con el mismo correo'})
        else:
            return json.dumps({'error': 'No se pudo actualizar el usuario'})
    else:
        return json.dumps({'error':'Accion no válida'})
    

            
            
