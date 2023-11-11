import { useState } from "react";
import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import '../assets/styles/pages/AccesoYRegistro.css';
import Panel from "../components/Panel";
import Avatar from '../assets/images/avatar.gif'
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material"; 

const AccessoYRegistro = (props) => {
    useEffect(() => { // Realiza el efecto de la transicion entre el login y el registro
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('sign_in_and_sign_up_container');
    
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });
    
        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');

    const newNameHandler = (event) => {
        setNewName(event.target.value);
    }

    const newEmailHandler = (event) => {
        setNewEmail(event.target.value);
    }

    const newPasswordHandler = (event) => {
        setNewPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const newUser = {
            name:newName,
            email:newEmail,
            password:newPassword
        }
        props.add(newUser);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
    }

    const registeredEmailHandler = (event) => {
        setRegisteredEmail(event.target.value);
    }

    const registeredPasswordHandler = (event) => {
        setRegisteredPassword(event.target.value);
    }

    const readHandler = (event) => {
        event.preventDefault();

        const user = {
            email:registeredEmail,
            password:registeredPassword
        }
        props.read(user);
        setRegisteredEmail('');
        setRegisteredPassword('');
    }

    return (
        <main className="container_main_si_su">
            <div className="container-si-su" id="sign_in_and_sign_up_container">
                <div className="form-container sign-up-container">
                    <form action="#" className="form-container-data" onSubmit={submitHandler}>
                        <h1>Crear Cuenta</h1>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="name">Nombre</InputLabel>
                                <Input id="name" type="text" aria-describedby="name-helper" value={newName} onChange={newNameHandler}/>
                                <FormHelperText id="name-helper">Escribe tu nombre completo.</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="email1">Email</InputLabel>
                                <Input id="email1" type="email" aria-describedby="email-helperr" value={newEmail} onChange={newEmailHandler}/>
                                <FormHelperText id="email-helperr">Escribe tu dirección de Correo Electrónico.</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="password1">Contraseña</InputLabel>
                                <Input id="password1" type="password" aria-describedby="password-helperr" value={newPassword} onChange={newPasswordHandler}/>
                                <FormHelperText id="password-helperr">Escribe tu contraseña</FormHelperText>
                            </FormControl>
                        </div>
                        <button className="button-access" type="submit">Crear Cuenta</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#" className="form-container-data" onSubmit={readHandler}>
                        <img src={Avatar} alt="Avatar" className="avatar" />
                        <h1>Iniciar Sesión</h1>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="email2">Email</InputLabel>
                                <Input id="email2" type="email" required aria-describedby="email-helper" value={registeredEmail} onChange={registeredEmailHandler}/>
                                <FormHelperText id="email-helper">Ingresa tu dirección de Correo Electrónico.</FormHelperText>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="password2">Contraseña</InputLabel>
                                <Input id="password2" type="password" required aria-describedby="password-helper" value={registeredPassword} onChange={registeredPasswordHandler}/>
                                <FormHelperText id="password-helper">Ingresa tu contraseña.</FormHelperText>
                            </FormControl>
                        </div>
                            <button className="button-access" type="submit">Iniciar Sesión</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <Panel 
                            typePanel="overlay-left"
                            title="Bienvenido de Regreso!"
                            description="Mantente conectado con nosotros. Inicia Sesión con tú información personal."
                            idButton="signIn"
                            button="Iniciar Sesión"
                        />
                        <Panel 
                            typePanel="overlay-right"
                            title="Hola, amigo!"
                            description="Ingrese sus datos personales y comience el viaje con nosotros."
                            idButton="signUp"
                            button="Crear Cuenta"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AccessoYRegistro;
