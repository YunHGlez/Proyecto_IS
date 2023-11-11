import json
from flask import Blueprint, request, render_template, flash
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
        status = add_user(name, email, password, 'super administrador')
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
                return json.dumps({'nombre': usuario.nombreUsuario, 'role': usuario.rol})
            return json.dumps({'error':'Contraseña incorrecta'})
        else:
            return json.dumps({'error':'Correo no registrado'})


            
