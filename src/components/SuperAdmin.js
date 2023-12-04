import { useState } from 'react';
import '../assets/styles/SuperAdmin.css';
import '../assets/styles/PaginaPrincipal.css';
import ListaAdministradores from './ListaAdministradores.js';
import NuevoAdministrador from './NuevoAdministrador.js';

const SuperAdmin = (props) => {
  let [admins, setAdmins] = useState(props.admins);
  const [maxid, setMaxID] = useState(id);

  async function addUser (admin) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'action': 'add', 'name': admin.name, 
        'email': admin.email, 'password': admin.password}),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
    } else {
      setAdmins((prevAdmins) => {
        admins = [admin, ...prevAdmins]
        return admins;
      });
      setMaxID((prevID) => {
        id = prevID+1
        return id;
      });
      alert('Administrador agregado con éxito');
    }
  }

  const addAdminHandler = (admin) => {
    addUser(admin)
  }

  async function deleteUser (admin) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'id' : admin.id, action : 'delete' }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
      return 1
    } else {
      setAdmins((prevAdmins) =>{
        admins = prevAdmins.filter(a =>
          a.id !== admin.id
        )
        return admins;
        });
        alert('Administrador eliminado con éxito');
      return 0
    }
  }

  const deleteAdminHandler = (admin) =>{
    deleteUser(admin)
  }

  async function updateUser (admin) {
    const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
      method:'POST',
      body: JSON.stringify({'id' : admin.id, action : 'update', 'name': admin.name,
       'email': admin.email, 'password': admin.password }),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
      return 1
    } else {
      setAdmins(admins.map(prevAdmin => {
        if (prevAdmin.id === admin.id) {
          return { ...prevAdmin, name: admin.name, email: admin.email, password: admin.password };
        } else {
          return prevAdmin;
        }
      }));
        alert('Administrador actualizado con éxito');
      return 0
    }
  }

  const updateAdminHandler = (admin) =>{
    updateUser(admin)
    }

    return (
      <div>
        <center><h1 className='h1JJ'>Administradores</h1></center>
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
  
  export default SuperAdmin;