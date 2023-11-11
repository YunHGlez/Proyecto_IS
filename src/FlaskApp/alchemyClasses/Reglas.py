from alchemyClasses import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Reglas(db.Model):
    __tablename__ = 'reglas'
    idTorneo = Column(Integer, ForeignKey("torneo.idTorneo", name='idTorneo'))
    regla = Column(String(200), primary_key=True) 
    torneos = relationship("Torneo", back_populates="reglas")

    def __init__(self, reglas, idTorneo):
        self.reglas=reglas
        self.idTorneo=idTorneo

    
    def __str__(self):
        return f'Reglas: {self.reglas}\nID Torneo: {self.idTorneo}'