import React, { useState } from 'react';
import '../assets/styles/TablaCrear.css';

const NuevoAdministrador = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const adminData = {
      id: props.id,
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword
    };

    props.onSaveAdminData(adminData);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredPassword('');
  };

  return (
    <form className="create-table" onSubmit={submitHandler}>
    <h3>Agregar nuevos administradores</h3>
    <center>
      <div className='create-controls'>
        <div className='create-control'>
          <label>Nombre:</label>
          <input
            type='text'
            value={enteredName}
            onChange={nameChangeHandler}
            required
          />
        </div>
        <div className='create-control'>
          <label>Correo:</label>
          <input
            type='email'
            value={enteredEmail}
            onChange={emailChangeHandler}
            required
          />
        </div>
        <div className='create-control'>
          <label>Contraseña:</label>
          <input
            type='password'
            value={enteredPassword}
            onChange={passwordChangeHandler}
            required
          />
        </div>
      </div>
      </center>
      <div className='create-actions'>
        <button type='submit'>Agregar Administrador</button>
      </div>
    </form>
  );
};

export default NuevoAdministrador;
