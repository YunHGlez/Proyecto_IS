from alchemyClasses import db
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Usuario(db.Model):
    __tablename__ = 'Usuario'
    nombreUsuario = Column(String(40))
    correo = Column(String(50), primary_key=True)    
    contraseña = Column(String(64))
    rol = Column(String(20))

    def __init__(self, nombre, correo, contraseña, rol):
        self.nombreUsuario=nombre
        self.correo=correo
        self.contraseña=contraseña
        self.rol=rol
    
    def __str__(self):
        return f'Nombre: {self.nombre}\nCorreo: {self.correo} \nContraseña: {self.contraseña} \nRol: {self.rol}'