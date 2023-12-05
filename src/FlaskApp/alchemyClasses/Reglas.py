from alchemyClasses import db
from sqlalchemy import Column, Integer, String

class Reglas(db.Model):
    __tablename__ = 'Reglas'
    idTorneo = Column(Integer)
    regla = Column(String(200), primary_key=True) 

    def __init__(self, reglas, idTorneo):
        self.reglas=reglas
        self.idTorneo=idTorneo

    
    def __str__(self):
        return f'Reglas: {self.reglas}\nID Torneo: {self.idTorneo}'