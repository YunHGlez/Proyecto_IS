import React from 'react';
import '../assets/styles/components/Participante.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { exitoCerrar, exitoCierraSolo, advertenciaCierraSolo } from '../assets/toastify';

import Avatar from '../assets/images/avatar.gif';

/**
 * Estte usuario se debe obtener de la base de datos, ya sea que se pase el correo como 
 * parametro a participante y a hacer la consulta aqui, mediante otro metodo. O que en Participante
 * se pase el JSON con al informacion del usuario.
 */
let usario = [{
    id: 1,
    nombre: 'Juan',
    correo: 'user1@gmail.com',
    contraseña: '12345678'
}];

const borrarCuenta = (event) => {
    event.preventDefault();
    const confirmacion = window.confirm("¿Estás seguro de que deseas borrar tu cuenta?");
    if (confirmacion) {
        exitoCerrar("Tu cuenta ha sido borrada con éxito. Has sido borrado de la base de datos.");
        // como redirecciono sin necesiadad de dar click?
    } else {
        advertenciaCierraSolo("Tu cuenta no ha sido borrada.");
    }
}

const editarPerfil = (event) => {
    event.preventDefault();
    const confirmacion = window.confirm("¿Estás seguro de que deseas guardar los datos ingresados a tu cuenta tu cuenta?");
    if (confirmacion) {
        exitoCierraSolo("Tu cuenta ha sido editada con éxito.");
    } else {
        advertenciaCierraSolo("Tu cuenta no ha sido editada.");
    }
};

const Participante = () => {
    const [nombre, setNombre] = React.useState(usario[0].nombre);
    const [correo, setCorreo] = React.useState(usario[0].correo);
    const [contraseña, setContraseña] = React.useState(usario[0].contraseña);
    const [mostrarContraseña, setMostrarContraseña] = React.useState(false);
    const toggleMostrarContraseña = () => {
        setMostrarContraseña(!mostrarContraseña);
    };
    return (
        <div>
            <p className='pruebita'>Perfil</p>
            <img src={Avatar} alt="Avatar" className="avatar" />
            <form>
                <div>
                    <h3>ID: {usario[0].id}</h3>
                </div>
                <div>
                    <ItemForm
                        label="Nombre"
                        type="text"
                        value={nombre}
                        placeholder="Ingrese su nuevo nombre a registrar."
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <ItemForm
                        label="Correo"
                        type="email"
                        value={correo}
                        placeholder="Ingrese su nuevo correo a registrar."
                        onChange={(event) => setCorreo(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
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
                <div>
                    <button type='submit' onClick={borrarCuenta}>
                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                        <h2>Borrar Cuenta</h2>
                    </button>
                    <button type='submit' onClick={editarPerfil}>
                        <FontAwesomeIcon icon="fa-solid fa-pen" />
                        <h2>Editar Perfil</h2>
                    </button>
                </div>
            </form>
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
