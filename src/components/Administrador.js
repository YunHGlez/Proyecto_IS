import { useState } from 'react';
import '../assets/styles/PaginaPrincipal.css';
import ListaTorneos from './ListaTorneos.js';
import NuevoTorneo from './NuevoTorneo.js';

const Administrador = (props) => {
  let [torneos, setTorneos] = useState(props.torneos);
  let [rules, setrules] = useState(props.rules);
  let [maxid, setMaxID] = useState(props.maxID);

  async function addTorneo (torneo, rules) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'action': 'addTorneo', 'participants': torneo.numParticipantes, 
        'game' : torneo.juego, 'initDate': torneo.fechaInicio, 'endDate' : torneo.fechaFin,
         'name' : torneo.nombreTorneo, 'console' : torneo.consola, 'email': torneo.correo, 'rules' : rules}),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
    } else {
      setTorneos(data.list);
      setrules(data.rules);
      setMaxID(data.maxid);
      sessionStorage.setItem("listData", JSON.stringify(data.list))
      sessionStorage.setItem("rules", JSON.stringify(data.rules))
      alert('Torneo agregado con éxito');
    }
  }

  const addTorneoHandler = (torneo, rules) => {
    addTorneo(torneo, rules)
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
      setTorneos(data.list);
      setrules(data.rules);
      sessionStorage.setItem("listData", JSON.stringify(data.list))
      sessionStorage.setItem("rules", JSON.stringify(data.rules))
      alert('Torneo eliminado con éxito');
      return 0
    }
  }

  const deleteTorneoHandler = (torneo) =>{
      deleteTorneo(torneo)
    }

  async function updateTorneo (torneo, rules) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'idTorneo' : torneo.idTorneo, action : 'updateTorneo', 'numParticipantes': torneo.numParticipantes,
      'game' : torneo.juego, 'initDate': torneo.fechaInicio, 'endDate' : torneo.fechaFin,
      'name' : torneo.nombreTorneo, 'console' : torneo.consola, 'email': torneo.correo, 'rules' : rules }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
      return 1
    } else {
      setTorneos(data.list);
      setrules(data.rules);
      setMaxID(data.maxid);
      sessionStorage.setItem("listData", JSON.stringify(data.list))
      sessionStorage.setItem("rules", JSON.stringify(data.rules))
      alert('Torneo actualizado con éxito');
      return 0
    }
  }

  const updateTorneoHandler = (torneo, rules) =>{
    updateTorneo(torneo, rules)
  }

    return (
      <div>
        <center><h1 className='h1JJ'>Torneos</h1></center>
        <div className='create-section'>
          <NuevoTorneo onSaveTournamentData={addTorneoHandler} id={maxid} />
        </div>
        <ListaTorneos
          torneos={torneos} 
          rules={rules}
          onDeleteTournamentData={deleteTorneoHandler}
          onUpdateTournamentData={updateTorneoHandler}/>
      </div>
    );
  };
  
  export default Administrador;