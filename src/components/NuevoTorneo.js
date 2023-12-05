import React, { useState } from 'react';
import '../assets/styles/TablaCrear.css';

const NuevoTorneo = (props) => {
  const [enteredParticipants, setEnteredParticipants] = useState('');
  const [enteredGame, setEnteredGame] = useState('');
  const [enteredInitDate, setEnteredInitDate] = useState('');
  const [enteredEndDate, setEnteredEndDate] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredConsole, setEnteredConsole] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');

  const handleParticipantsChange = (event) => {
    if(event.target.value !== ''){
        setEnteredParticipants(event.target.value);
    }
};

const handleGameChange = (event) => {
    if(event.target.value !== ''){
        setEnteredGame(event.target.value);
    }
};

const handleInitDateChange = (event) => {
    if(event.target.value !== ''){
        setEnteredInitDate(event.target.value);
    }
};

const handleEndDateChange = (event) => {
    if(event.target.value !== ''){
        setEnteredEndDate(event.target.value);
    }
};

const handleNameChange = (event) => {
  if(event.target.value !== ''){
    setEnteredName(event.target.value);
  }
};

const handleConsoleChange = (event) => {
    if(event.target.value !== ''){
      setEnteredConsole(event.target.value);
    }
  };

const handleEmailChange = (event) => {
  if(event.target.value !== ''){
    setEnteredEmail(event.target.value);
  }
};


const submitHandler = (event) => {
  event.preventDefault();
  const TournamentData = {
    idTorneo: props.id,
    numParticipantes: enteredParticipants,
    juego: enteredGame,
    fechaInicio: enteredInitDate,
    fechaFin: enteredEndDate,
    nombreTorneo: enteredName,
    consola: enteredConsole,
    correo: enteredEmail,
    estatus: 'no iniciado'
  };

    props.onSaveTournamentData(TournamentData);
    setEnteredParticipants('');
    setEnteredGame('');
    setEnteredInitDate('');
    setEnteredEndDate('');
    setEnteredName('');
    setEnteredConsole('');
    setEnteredEmail('');
  };

  return (
    <form className="create-table" onSubmit={submitHandler}>
    <h3 className='h3JJ'>Crear nuevo torneo</h3>
    <center>
      <div className='create-controls'>
      <div className='create-control'>
          <label>Máximo de participantes:</label>
          <input
            type='number'
            value={enteredParticipants}
            onChange={handleParticipantsChange}
            required
          />
        </div>
      <div className='create-control'>
          <label>Juego:</label>
          <input
            type='text'
            value={enteredGame}
            onChange={handleGameChange}
            required
          />
        </div>
        <div className='create-control'>
          <label>Fecha de inicio:</label>
          <input
            type='date'
            value={enteredInitDate}
            onChange={handleInitDateChange}
            required
          />
        </div>
        <div className='create-control'>
          <label>Fecha de fin:</label>
          <input
            type='date'
            value={enteredEndDate}
            onChange={handleEndDateChange}
            required
          />
        </div>
        <div className='create-control'>
          <label>Nombre del torneo:</label>
          <input
            type='text'
            value={enteredName}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className='create-control'>
          <label>Consola:</label>
          <input
            type='text'
            value={enteredConsole}
            onChange={handleConsoleChange}
            required
          />
        </div>
        <div className='create-control'>
          <label>Correo:</label>
          <input
            type='email'
            value={enteredEmail}
            onChange={handleEmailChange}
            required
          />
        </div>
      </div>
      </center>
      <div className='create-actions'>
        <button type='submit'>Agregar Torneo</button>
      </div>
    </form>
  );
};

export default NuevoTorneo;
