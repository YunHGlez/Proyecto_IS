import React from 'react';
import '../assets/styles/components/Participante.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { exitoCerrar, exitoCierraSolo, advertenciaCierraSolo } from '../assets/toastify';

import Avatar from '../assets/images/avatar.gif';

const Participante = (props) => {
    const [nombre, setNombre] = React.useState(props.usuario.name);
    const [correo, setCorreo] = React.useState(props.usuario.email);
    const [contraseña, setContraseña] = React.useState('');
    const [mostrarContraseña, setMostrarContraseña] = React.useState(false);
    const toggleMostrarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
    };


    async function deleteUser (id) {
        const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
          method:'POST',
          body: JSON.stringify({'id' : id, action : 'deleteAccount' }),
          headers: {
            'Content-Type':'application/json'
          }
        });
        const data = await response.json();
        if (data.error !== undefined) {
          alert("ERROR: " + data.error);
          return 1
        } else {
            exitoCerrar("Tu cuenta ha sido borrada con éxito. Has sido borrado de la base de datos.");
            props.logout()
          return 0
        }
    }

    const borrarCuenta = (event) => {
        event.preventDefault();
        const confirmacion = window.confirm("¿Estás seguro de que deseas borrar tu cuenta?");
        if (confirmacion) {
            deleteUser(props.usuario.id)
        } else {
            advertenciaCierraSolo("Tu cuenta no ha sido borrada.");
        }
    }
    
    async function updateUser (id) {
        const response = await fetch('http://127.0.0.1:5000/PaginaPrincipal', {
          method:'POST',
          body: JSON.stringify({'id' : id, action : 'updateUser', 'name': nombre,
           'email': correo, 'password': contraseña }),
          headers: {
            'Content-Type':'application/json'
          }
        });
        const data = await response.json();
        if (data.error !== undefined) {
          alert("ERROR: " + data.error);
          return 1
        } else {
            exitoCierraSolo("Tu cuenta ha sido editada con éxito.");
          return 0
        }
    }

    const editarPerfil = (event) => {
        event.preventDefault();
        const confirmacion = window.confirm("¿Estás seguro de que deseas guardar los datos ingresados a tu cuenta tu cuenta?");
        if (confirmacion) {
            updateUser(props.usuario.id)
        } else {
            advertenciaCierraSolo("Tu cuenta no ha sido editada.");
        }
    };

    return (
        <div className='p-pefil-background' >
            <div className='p-perfil-container'>
                <h1>Perfil</h1>
                <div className='image-container-perfil'>
                    <img src={Avatar} alt="Avatar" className="avatar" />
                </div>
                <form className='perfil-form-p'>
                    <div>
                        <h3>ID: {props.usuario.idUsuario}</h3>
                    </div>
                    <div className='item-form-perfil-p'>
                        <ItemForm
                            label="Nombre:"
                            type="text"
                            value={nombre}
                            placeholder="Ingrese su nuevo nombre a registrar."
                            onChange={(event) => setNombre(event.target.value)}
                            required
                        />
                    </div>
                    <div className='item-form-perfil-p'>
                        <ItemForm
                            label="Correo:"
                            type="email"
                            value={correo}
                            placeholder="Ingrese su nuevo correo a registrar."
                            onChange={(event) => setCorreo(event.target.value)}
                            required
                        />
                    </div>
                    <div className='item-form-perfil-p item-form-perfil-p-cont'>
                        <label>Contraseña:</label>
                        <div>
                            <input
                                type={mostrarContraseña ? 'text' : 'password'}
                                value={contraseña}
                                onChange={(event) => setContraseña(event.target.value)}
                                placeholder='Ingrese su nueva contraseña a registrar.'
                                required
                            />
                            <button type='button' onClick={toggleMostrarContraseña}>
                                <FontAwesomeIcon icon={mostrarContraseña ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} />
                            </button>
                        </div>
                    </div>
                    <div className='subbmits-pefil-p'>
                        <button className='borrar' type='submit' onClick={borrarCuenta}>
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                            <h2>Borrar Cuenta</h2>
                        </button>
                        <button className='editar' type='submit' onClick={editarPerfil}>
                            <FontAwesomeIcon icon="fa-solid fa-pen" />
                            <h2>Editar Perfil</h2>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ItemForm = (props) => {
    return (
        <>
            <label>{props.label}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                value={props.value} 
                required
                onChange={props.onChange}
            />
        </>
    );
};

export default Participante;
