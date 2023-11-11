from alchemyClasses.Usuario import Usuario
from alchemyClasses import db
from sqlalchemy import update, delete
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

def get_all_users():
    return Usuario.query.all()

def get_user_by_key(correo=''):
    return Usuario.query.filter(Usuario.correo == correo).first()

def search_user(nombre='', correo='', contraseña=''):
    if(nombre == '' and correo == '' and contraseña == ''):
        return get_all_users()
    filter_data = {'correo': ''}
    if(nombre != ''):
        filter_data['nombre'] = nombre
    if(contraseña != ''):
        filter_data['contraseña'] = sha256(cipher(contraseña)).hexdigest()
    if(correo == ''):
        del filter_data['correo']
    else:
        filter_data['correo'] = correo
    return Usuario.query.filter_by(**filter_data)

def user_check_password(email, contraseña):
    usuario = get_user_by_key(email)
    if(usuario == None):
        return False
    return sha256(cipher(contraseña)).hexdigest() == usuario.contraseña
    

def add_user(nombre='', correo='', contraseña='', rol=''):
    if(nombre == ''):
        print("Nombre inválido")
        return 1
    if(correo == ''):
        print("correo inválido")
        return 2
    if(contraseña == ''):
        print("contraseña inválida")
        return 3
    rol = rol.lower()
    if(rol != 'super administrador' and rol != 'administrador' and rol != 'participante'):
        print("Rol inválido")
        return 4
    passwd = sha256(cipher(contraseña)).hexdigest()
    consult = Usuario.query.filter(Usuario.correo == correo)
    if(consult.count() > 0):
        print("Ya hay un usuario registrado con ese correo")
        return 5
    usuario = Usuario(nombre, correo, passwd, rol)
    db.session.add(usuario)
    db.session.commit()
    return 0

def update_user(correo='', nombre='', nuevoNombre='', nuevoCorreo='', passwd=''):
    usuario = None
    if(correo != '' or nombre != ''):
        usuario = search_user(nombre, correo, '').first()
    if(usuario != None):
        if(nuevoCorreo == '' and nuevoNombre == '' and passwd == ''):
            return usuario
        if(nuevoCorreo != ''):
            if(get_user_by_key(nuevoCorreo) != None):
                return None
            usuario.correo = nuevoCorreo
        if(nuevoNombre != ''):
            usuario.nombre = nuevoNombre
        if(passwd != ''):
            contraseña = sha256(cipher(passwd)).hexdigest()
            usuario.contraseña = contraseña
        try:
            db.session.commit()
        except:
            return None
    else:
        return None
    return usuario

def delete_user(correo):
    usuario = get_user_by_key(correo)
    if(usuario != None):
        consult = Usuario.query.filter(Usuario.correo == correo)
        datos = str(consult.first())
        consult.delete(synchronize_session=False)
        db.session.commit()
        return datos
    else:
        return None


    