from alchemyClasses.Reglas import Reglas
from alchemyClasses import db

def get_all_reglas():
    return Reglas.query.all()

def get_reglas():
    reglas = get_all_reglas()
    lista = []
    for regla in reglas:
        lista.append({'idTorneo': regla.idTorneo, 'regla' : regla.regla})
    return lista

def get_regla_by_key(regla=''):
    return Reglas.query.filter(Reglas.regla == regla).first()

def search_regla(idTorneo='', regla=''):
    if(idTorneo == '' and regla == ''):
        return get_all_reglas()
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
    reglas = Reglas(regla, idTorneo)
    db.session.add(reglas)
    db.session.commit()
    return {'reglas' : reglas.regla, 'idTorneo' : reglas.idTorneo}

def update_regla(id='', nuevasReglas=''):
    reglas = Reglas.query.filter(Reglas.idTorneo == id)
    if(reglas != None and nuevasReglas != '' and id != ''):
        reglas.delete(synchronize_session=False)
        for regla in nuevasReglas:
            add_regla(id, regla)
    else:
        return None
    return  Reglas.query.filter(Reglas.idTorneo == id).first()