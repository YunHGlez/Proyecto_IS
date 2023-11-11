from alchemyClasses.Torneo import Torneo
from alchemyClasses import db
from datetime import datetime
from sqlalchemy import update, delete
from modeloUsuario import get_user_by_key

def get_all_torneos():
    return Torneo.query.all()

def get_torneo_by_id(id=''):
    return Torneo.query.filter(Torneo.idTorneo == id).first()

def search_torneo(idTorneo='', nombreTorneo='', numParticipantes='', juego='', fechaInicio='', 
                  fechaFin='', consola='', correoUsuario=''):
    args = [idTorneo, numParticipantes, juego, fechaInicio, 
            fechaFin, nombreTorneo, consola, correoUsuario]
    
    if(args == ['','','','','','','','','']):
        return get_all_torneos()
    
    filter_data = {'correoUsuario': ''}

    if(idTorneo != ''):
        filter_data['idtorneo'] = idTorneo
    if(numParticipantes != ''):
        filter_data['numParticipantes'] = numParticipantes
    if(juego != ''):
        filter_data['juego'] = juego
    if(fechaInicio != ''):
        filter_data['fechaInicio'] = fechaInicio
    if(fechaFin != ''):
        filter_data['fechaFin'] = fechaFin
    if(nombreTorneo != ''):
        filter_data['nombreTorneo'] = nombreTorneo
    if(consola != ''):
        filter_data['consola'] = consola
    if(correoUsuario == ''):
        del filter_data['correoUsuario']
    else:
        filter_data['correoUsuario'] = correoUsuario

    return Torneo.query.filter_by(**filter_data)
    

def add_torneo(numParticipantes='', juego='', fechaInicio='', fechaFin='',
                nombreTorneo='', consola='', correoUsuario='', estatus=''):
    try:
        participantes = int(numParticipantes)
    except:
        return None
    if(juego == ''):
        return None
    if(fechaInicio == ''):
        return None
    if(fechaFin == ''):
        return None
    if(nombreTorneo == ''):
        return None
    if(consola == ''):
        return None
    if(correoUsuario == ''):
        return None
    if(estatus != 'Finalizado' and estatus != 'En curso' and estatus != 'No iniciado'):
        return None
    
    usuario = get_user_by_key(correoUsuario)
    if(usuario == None or usuario.rol != 'administrador'):
        return None

    torneo = Torneo(participantes, juego, fechaInicio, fechaFin,
                 nombreTorneo, consola, correoUsuario, estatus)
    db.session.add(torneo)
    db.session.commit()
    return torneo

def update_torneo(idTorneo='', nombreTorneo='', nuevoID='', numParticipantes='', juego='', 
        fechaInicio='', fechaFin='', nuevoNombre='', consola='', correoUsuario='', estatus=''):
    torneo = None
    if(idTorneo != '' or nombreTorneo != ''):
        torneo = search_torneo(idTorneo, nombreTorneo).first()
    if(torneo != None):
        args = [nuevoID, numParticipantes, juego, fechaInicio, 
            fechaFin, nuevoNombre, consola, correoUsuario, estatus]
        if(args == ['','','','','','','','','','']):
            return torneo
        if(idTorneo != ''):
            if(get_torneo_by_id(idTorneo) != None):
                return None
            torneo.idTorneo = nuevoID
        if(nuevoNombre != ''):
            torneo.nombre = nuevoNombre
        if(numParticipantes != ''):
            try:
                torneo.numParticipantes = int(numParticipantes)
            except:
                return None
        if(juego != ''):
            torneo.juego = juego
        if(fechaInicio != ''):
            try:
                torneo.fechaInicio = datetime.strptime(fechaInicio, '%Y-%m-%d').date()
            except:
                return None
        if(fechaFin != ''):
            try:
                torneo.fechaFin = datetime.strptime(fechaFin, '%Y-%m-%d').date()
            except:
                return None
        if(consola != ''):
            torneo.consola = consola
        if(correoUsuario != ''):
            torneo.correo = correoUsuario
        try:
            db.session.commit()
        except:
            return None
    else:
        return None
    return torneo

def delete_torneo(id):
    torneo = get_torneo_by_id(id)
    if(torneo != None):
        consult =  Torneo.query.filter(Torneo.idTorneo == id)
        datos = str(consult.first())
        consult.delete(synchronize_session=False)
        db.session.commit()
        return datos
    else:
        return None