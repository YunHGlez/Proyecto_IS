from alchemyClasses.Reglas import Reglas
from alchemyClasses import db
from model.modeloTorneo import get_torneo_by_id

def get_all_rents():
    return Reglas.query.all()

def get_regla_by_key(regla=''):
    return Reglas.query.filter(Reglas.regla == regla).first()

def search_regla(idTorneo='', regla=''):
    if(idTorneo == '' and regla == ''):
        return get_all_rents()
    filter_data = {'reglas': ''}
    if(idTorneo != ''):
        filter_data['idTorneo'] = idTorneo
    if(regla == ''):
        del filter_data['regla']
    else:
        filter_data['regla'] = regla
    return Reglas.query.filter_by(**filter_data)

def add_regla(idTorneo='', regla=''):
    if(idTorneo == ''):
        return None
    if(regla == ''):
        return None
    torneo = get_torneo_by_id(idTorneo)
    if(torneo == None):
        return None
    reglas = reglas(idTorneo, regla)
    db.session.add(reglas)
    db.session.commit()
    return reglas

def update_regla(id='', regla=''):
    reglas = Reglas.query.filter(Reglas.idTorneo == id)
    if(reglas != None and regla != ''):
        reglas.regla = regla
        db.session.commit()
    else:
        return None
    return reglas.first()