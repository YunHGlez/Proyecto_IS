from alchemyClasses import db
from sqlalchemy import Column, Integer, String

class Reglas(db.Model):
    __tablename__ = 'Reglas'
    idTorneo = Column(Integer)
    regla = Column(String(200), primary_key=True) 

    def __init__(self, reglas, idTorneo):
        self.idTorneo=idTorneo
        self.regla=reglas

    
    def __str__(self):
        return f'Reglas: {self.regla}\nID Torneo: {self.idTorneo}'