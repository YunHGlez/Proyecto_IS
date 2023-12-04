import json
from flask import Blueprint, request, render_template, flash, session, redirect, url_for
from flask_cors import CORS, cross_origin
from model.modeloUsuario import *

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
            if(user_check_password(email, password)):
                session['rol'] = usuario.rol
                session['id'] = usuario.idUsuario
                if(usuario.rol == 'superAdministrador'):
                    datos = get_users_by_role('administrador')
                    return json.dumps({'nombre': usuario.nombreUsuario, 'role': usuario.rol, 'list': datos})
            return json.dumps({'error':'Contraseña incorrecta'})
        else:
            return json.dumps({'error':'Correo no registrado'})

@user.route('/PaginaPrincipal',  methods=('GET', 'POST'))
@cross_origin()      
def update_users():
    if request.method == 'GET':
        datos = get_users_by_role('administrador')
        return json.dumps({'list': datos, 'role' : 'superAdministrador'})
    action = request.json.get("action", None)
    if action == '':
        return json.dumps({'error':'Datos insuficientes'})
    else:
        if(action == 'delete'):
            id = request.json.get("id", None)
            user = delete_user(id)
            return json.dumps({'data': 'success'})
        if(action == 'add'):
            name = request.json.get("name", None)
            email = request.json.get("email", None)
            password = request.json.get("password", None)
            if name == '' or email == '' or password == '':
                return json.dumps({'error':'Completa todos los campos'})
            else:
                status = add_user(name, email, password, 'administrador')
            if(status == 0):
                return json.dumps({'ok': 'Administrador agregado con éxito'})
            elif(status == 4):
                return json.dumps({'error':'Correo ya registrado'})
            else:
                return json.dumps({'error':'No se pudo registrar el administrador'})
        if(action == 'update'):
            id = request.json.get("id", None)
            name = request.json.get("name", None)
            email = request.json.get("email", None)
            password = request.json.get("password", None)
            user = update_user(id, name, email, password)
            if(user == 0):
                return json.dumps({'data': 'success'})
            if(user == 2):
                return json.dumps({'error': 'Ya existe otro usuario con el mismo correo'})
            else:
                print(user)
                return json.dumps({'error': 'No se pudo actualizar el administrador'})
        else:
            return json.dumps({'error':'Accion no válida'})

            
            
