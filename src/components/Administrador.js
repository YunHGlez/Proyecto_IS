import { useState } from 'react';
import '../assets/styles/PaginaPrincipal.css';
import ListaTorneos from './ListaTorneos.js';
import NuevoTorneo from './NuevoTorneo.js';

const Administrador = (props) => {
  let [torneos, setTorneos] = useState(props.torneos);
  let [maxid, setMaxID] = useState(props.maxID);

  async function addTorneo (torneo) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'action': 'addTorneo', 'participants': torneo.numParticipantes, 
        'game' : torneo.juego, 'initDate': torneo.fechaInicio, 'endDate' : torneo.fechaFin,
         'name' : torneo.nombreTorneo, 'console' : torneo.consola, 'email': torneo.correo}),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
    } else {
      setTorneos((prevTorneos) => {
        torneos = [torneo, ...prevTorneos]
        return torneos;
      });
      setMaxID((prevID) => {
        maxid = prevID+1
        return maxid;
      });
      alert('Torneo agregado con éxito');
    }
  }

  const addTorneoHandler = (torneo) => {
    addTorneo(torneo)
  }

  async function deleteTorneo (torneo) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'id' : torneo.idTorneo, action : 'deleteTorneo' }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
      return 1
    } else {
      setTorneos((prevTorneos) =>{
        torneos = prevTorneos.filter(a =>
          a.idTorneo !== torneo.idTorneo
        )
        return torneos;
        });
        alert('Torneo eliminado con éxito');
      return 0
    }
  }

  const deleteTorneoHandler = (torneo) =>{
      deleteTorneo(torneo)
    }

  async function updateTorneo (torneo) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'idTorneo' : torneo.idTorneo, action : 'updateTorneo', 'numParticipantes': torneo.numParticipantes,
      'game' : torneo.juego, 'initDate': torneo.fechaInicio, 'endDate' : torneo.fechaFin,
      'name' : torneo.nombreTorneo, 'console' : torneo.consola, 'email': torneo.correo }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
      return 1
    } else {
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
      return 0
    }
  }

  const updateTorneoHandler = (torneo) =>{
    updateTorneo(torneo)
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
  
  export default Administrador;