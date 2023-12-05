from alchemyClasses.Torneo import Torneo
from alchemyClasses import db
from datetime import datetime
from sqlalchemy import update, delete

def get_all_torneos():
    return Torneo.query.all()

def get_torneo_by_id(id=''):
    return Torneo.query.filter(Torneo.idTorneo == id).first()

def get_torneos():
    torneos = get_all_torneos()
    lista = []
    for torneo in torneos:
        inicio = torneo.fechaInicio.strftime("%Y-%m-%d")
        fin = torneo.fechaFin.strftime("%Y-%m-%d")
        lista.append({'idTorneo': torneo.idTorneo, 'numParticipantes': torneo.numParticipantes, 
                      'juego' : torneo.juego, 'fechaInicio' : inicio, 'fechaFin' : fin, 
                      'nombreTorneo' : torneo.nombreTorneo, 'consola' : torneo.consola, 
                      'correo' : torneo.correo, 'estatus' : torneo.estatus})
    return lista

def get_next_idTorneo():
    maxid = 0
    torneos = Torneo.query.order_by(Torneo.idTorneo.desc()).all()
    maxid = torneos[0].idTorneo
    return maxid

def search_torneo(idTorneo='', nombreTorneo='', numParticipantes='', juego='', fechaInicio='', 
                  fechaFin='', consola='', correoUsuario=''):
    args = [idTorneo, numParticipantes, juego, fechaInicio, 
            fechaFin, nombreTorneo, consola, correoUsuario]
    
    if(args == ['','','','','','','','','']):
        return get_all_torneos()
    
    filter_data = {'correoUsuario': ''}

    if(idTorneo != ''):
        filter_data['idTorneo'] = idTorneo
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
        print("TORNEO NO NULL")
        args = [nuevoID, numParticipantes, juego, fechaInicio, 
            fechaFin, nuevoNombre, consola, correoUsuario, estatus]
        if(args == ['','','','','','','','','','']):
            return torneo
        if(idTorneo != '' and idTorneo != torneo.idTorneo):
            if(get_torneo_by_id(idTorneo) != None):
                print("ID REPETIDO")
                return None
            torneo.idTorneo = nuevoID
        if(nuevoNombre != ''):
            torneo.nombre = nuevoNombre
        if(numParticipantes != '' and numParticipantes != None):
            try:
                torneo.numParticipantes = int(numParticipantes)
            except:
                print("NO ES NUMERO")
                return None
        if(juego != ''):
            torneo.juego = juego
        if(fechaInicio != ''):
            try:
                torneo.fechaInicio = datetime.strptime(fechaInicio, '%Y-%m-%d').date()
            except:
                print("NO ES FECHA")
                return None
        if(fechaFin != ''):
            try:
                torneo.fechaFin = datetime.strptime(fechaFin, '%Y-%m-%d').date()
            except:
                print("NO ES FECHA FIN")
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
        print("NO HAY TORNEO")
        return None
    return torneo

def delete_torneo(id):
    print(id)
    torneo = get_torneo_by_id(id)
    if(torneo != None):
        consult =  Torneo.query.filter(Torneo.idTorneo == id)
        datos = str(consult.first())
        consult.delete(synchronize_session=False)
        db.session.commit()
        return datos
    else:
        return None