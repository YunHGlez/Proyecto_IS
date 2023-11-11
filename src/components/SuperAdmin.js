import { useState } from 'react';
import '../assets/styles/SuperAdmin.css';
import ListaAdministradores from './ListaAdministradores.js';
import NuevoAdministrador from './NuevoAdministrador.js';

const SuperAdmin = () => {
  const [admins, setAdmins] = useState(ADMINS);
  const [maxid, setMaxID] = useState(id);
  const addAdminHandler = (admin) => {
    setAdmins((prevAdmins) => {
      ADMINS = [admin, ...prevAdmins]
      return ADMINS;
    });
    setMaxID((prevID) => {
      id = prevID+1
      return id;
    });
    alert('Administrador agregado con éxito');
  }

  const deleteAdminHandler = (admin) =>{
      setAdmins((prevAdmins) =>{
        ADMINS = prevAdmins.filter(a =>
          a.id !== admin.id
        )
        return ADMINS;
        });
        alert('Administrador eliminado con éxito');
    }

  const updateAdminHandler = (admin) =>{
    setAdmins(admins.map(prevAdmin => {
      if (prevAdmin.id === admin.id) {
        return { ...prevAdmin, name: admin.name, email: admin.email, password: admin.password };
      } else {
        return prevAdmin;
      }
    }));
      alert('Administrador actualizado con éxito');
    }

    return (
      <div>
        <center><h1>Administradores</h1></center>
        <div className='create-section'>
          <NuevoAdministrador onSaveAdminData={addAdminHandler} id={maxid} />
        </div>
        <ListaAdministradores 
          admins={admins} 
          onDeleteUserData={deleteAdminHandler}
          onUpdateUserData={updateAdminHandler}/>
      </div>
    );
  };
  let id = 7;
  let ADMINS = [
    {id: 6, name: "admin6", email: "correo6@gmail.com", password: "password6"},
    {id: 5, name: "admin5", email: "correo5@gmail.com", password: "password5"},
    {id: 4, name: "admin4", email: "correo4@gmail.com", password: "password4"},
    {id: 3, name: "admin3", email: "correo3@gmail.com", password: "password3"},
    {id: 2, name: "admin2", email: "correo2@gmail.com", password: "password2"},
    {id: 1, name: "admin1", email: "correo1@gmail.com", password: "password1"}
  ];
  
  export default SuperAdmin;