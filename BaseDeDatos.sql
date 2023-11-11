DROP DATABASE IF EXISTS practica5;
CREATE DATABASE practica5;
USE practica5;
DROP USER IF EXISTS 'root'@'localhost';
CREATE USER 'root'@'localhost' identified by 'password123';
GRANT ALL PRIVILEGES ON practica5.* TO 'root'@'localhost';

CREATE TABLE Usuario
(
  idUsuario SERIAL NOT NULL UNIQUE,
  nombreUsuario VARCHAR(50) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  contraseña VARCHAR(64) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  PRIMARY KEY (correo)
);

CREATE TABLE Torneo
(
  idTorneo SERIAL NOT NULL,
  numParticipantes INT NOT NULL,
  juego VARCHAR(50) NOT NULL,
  fechaInicio DATE NOT NULL,
  fechaFin DATE NOT NULL,
  nombreTorneo VARCHAR(50) NOT NULL,
  consola VARCHAR(30) NOT NULL,
  correo VARCHAR(50),
  estatus VARCHAR(20),
  PRIMARY KEY (idTorneo),
  FOREIGN KEY (correo) REFERENCES Usuario(correo)
);

CREATE TABLE Reglas
(
  id INT NOT NULL,
  regla VARCHAR(200) NOT NULL,
  PRIMARY KEY (regla),
  FOREIGN KEY (id) REFERENCES Torneo(idTorneo)
);

