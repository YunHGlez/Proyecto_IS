from alchemyClasses import db
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

class Torneo(db.Model):

    __tablename__ = 'torneo'
    idTorneo = Column(Integer, primary_key=True)
    numParticipantes = Column(Integer)
    juego = Column(String(50))    
    fechaInicio = Column(DateTime)
    fechaFin = Column(DateTime)
    nombreTorneo = Column(String(50))
    consola = Column(String(30))
    correo = Column(String(50))
    estatus = Column(String(20))
    reglas = relationship("Reglas", back_populates="torneo")

    def __init__(self, numParticipantes, juego, fechaInicio, 
                 fechaFin, nombreTorneo, consola, correo, estatus):
        fechaInit = datetime.strptime(fechaInicio, '%Y-%m-%d').date()
        fechaEnd = datetime.strptime(fechaFin, '%Y-%m-%d').date()
        self.numParticipantes=numParticipantes
        self.juego=juego
        self.fechaInicio=fechaInit
        self.fechaFin=fechaEnd
        self.nombreTorneo=nombreTorneo
        self.consola=consola
        self.correo=correo
        self.estatus=estatus

    
    def __str__(self):
        return f'Num Participantes: {self.numParticipantes}\nJuego: {self.juego} 
            \nFecha inicio: {self.fechaInicio} \nFecha fin: {self.fechaFin} 
            \nID torneo: {self.idTorneo} \nNombre torneo: {self.nombreTorneo} 
            \nConsola: {self.consola} \nNombre usuario: {self.correo}'