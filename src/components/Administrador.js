import { useState } from 'react';
import '../assets/styles/PaginaPrincipal.css';
import ListaTorneos from './ListaTorneos.js';
import NuevoTorneo from './NuevoTorneo.js';

const Administrador = () => {
  const [torneos, setTorneos] = useState(TORNEOS);
  const [maxid, setMaxID] = useState(id);
  const addTorneoHandler = (torneo) => {
    setTorneos((prevTorneos) => {
      TORNEOS = [torneo, ...prevTorneos]
      return TORNEOS;
    });
    setMaxID((prevID) => {
      id = prevID+1
      return id;
    });
    alert('Torneo agregado con éxito');
  }

  const deleteTorneoHandler = (torneo) =>{
      setTorneos((prevTorneos) =>{
        TORNEOS = prevTorneos.filter(a =>
          a.idTorneo !== torneo.idTorneo
        )
        return TORNEOS;
        });
        alert('Torneo eliminado con éxito');
    }

  const updateTorneoHandler = (torneo) =>{
    setTorneos(torneos.map(prevTorneo => {
      if (prevTorneo.idTorneo === torneo.idTorneo) {
        return { ...prevTorneo, 
            numParticipantes: torneo.numParticipantes, 
            juego: torneo.juego, 
            fechaInicio: torneo.fechaInicio, 
            fechaFin: torneo.fechaFin, 
            nombreTorneo: torneo.nombreTorneo, 
            consola: torneo.consola, 
            estatus: torneo.estatus};
      } else {
        return prevTorneo;
      }
    }));
      alert('Torneo actualizado con éxito');
    }

    return (
      <div>
        <center><h1 className='h1JJ'>Torneos</h1></center>
        <div className='create-section'>
          <NuevoTorneo onSaveTournamentData={addTorneoHandler} id={maxid} />
        </div>
        <ListaTorneos
          torneos={torneos} 
          onDeleteTournamentData={deleteTorneoHandler}
          onUpdateTournamentData={updateTorneoHandler}/>
      </div>
    );
  };
  let id = 7;
  let TORNEOS = [
    {idTorneo: 6, numParticipantes: 10, juego: "juego6", fechaInicio: "2023-02-02", 
    fechaFin: "2023-02-05", nombreTorneo: "Torneo6", consola: "Consola5", 
    correo: "torneo6@gmail.com", estatus: "FINALIZADO"},
    {idTorneo: 5, numParticipantes: 20, juego: "juego5", fechaInicio: "2023-02-20", 
    fechaFin: "2023-03-01", nombreTorneo: "Torneo5", consola: "Consola5", 
    correo: "torneo5@gmail.com", estatus: "FINALIZADO"},
    {idTorneo: 4, numParticipantes: 15, juego: "juego5", fechaInicio: "2023-12-20", 
    fechaFin: "2023-12-24", nombreTorneo: "Torneo4", consola: "Consola3", 
    correo: "torneo4@gmail.com", estatus: "NO INICIADO"},
    {idTorneo: 3, numParticipantes: 16, juego: "juego3", fechaInicio: "2023-11-28", 
    fechaFin: "2023-11-30", nombreTorneo: "Torneo3", consola: "Consola3", 
    correo: "torneo3@gmail.com", estatus: "EN CURSO"},
    {idTorneo: 2, numParticipantes: 32, juego: "juego2", fechaInicio: "2024-01-01", 
    fechaFin: "2024-01-07", nombreTorneo: "Torneo2", consola: "Consola2", 
    correo: "torneo2@gmail.com", estatus: "NO INICIADO"},
    {idTorneo: 1, numParticipantes: 100, juego: "juego1", fechaInicio: "2024-02-02", 
    fechaFin: "2024-03-03", nombreTorneo: "Torneo1", consola: "Consola1", 
    correo: "correo1@gmail.com", estatus: "NO INICIADO"}
  ];
  
  export default Administrador;