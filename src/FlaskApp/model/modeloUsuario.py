from alchemyClasses.Usuario import Usuario
from alchemyClasses import db
from sqlalchemy import update, delete
from hashlib import sha256
from CryptoUtils.CryptoUtils import cipher

def get_all_users():
    return Usuario.query.all()

def get_user_by_key(correo=''):
    return Usuario.query.filter(Usuario.correo == correo).first()

def get_user_by_id(id=''):
    return Usuario.query.filter(Usuario.idUsuario == id).first()

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
    
def get_users_by_role(rol):
    usuarios = Usuario.query.filter(Usuario.rol == rol).all()
    lista = []
    for usuario in usuarios:
        lista.append({'id': usuario.idUsuario, 'name': usuario.nombreUsuario, 
                      'email': usuario.correo, 'password': usuario.contraseña})
    return lista

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

def update_user(id='', nuevoNombre='', nuevoCorreo='', passwd=''):
    usuario = get_user_by_id(id)
    if(usuario != None):
        if(nuevoCorreo == '' and nuevoNombre == '' and passwd == ''):
            return usuario
        if(nuevoCorreo != '' and usuario.correo != nuevoCorreo):
            if(get_user_by_key(nuevoCorreo) != None):
                return 2
            usuario.correo = nuevoCorreo
        if(nuevoNombre != ''):
            usuario.nombreUsuario = nuevoNombre
        if(passwd != ''):
            contraseña = sha256(cipher(passwd)).hexdigest()
            usuario.contraseña = contraseña
        try:
            db.session.commit()
        except:
            return 3
    else:
        return 1
    return 0

def delete_user(id):
    usuario = get_user_by_id(id)
    if(usuario != None):
        consult = Usuario.query.filter(Usuario.idUsuario == id)
        datos = str(consult.first())
        consult.delete(synchronize_session=False)
        db.session.commit()
        return datos
    else:
        return None


    