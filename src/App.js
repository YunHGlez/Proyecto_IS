import React from "react";
import {Routes, Route, useNavigate } from "react-router-dom";
import './assets/fontawesome'; // Iconos para toda la pagina NO BORRAR
import './assets/styles/reset.css';
import './assets/styles/App.css';
import Home from "./pages/Home";
import AccessoYRegistro from "./pages/AccesoYRegistro";
import Footer from "./components/Footer";
import PaginaPrincipal from "./pages/PaginaPrincipal";
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(-1);
  const navigate = useNavigate();

  const userRole = (value) => {
    if(value === 'super administrador')
      setUser(0);
    if(value === 'administrador')
      setUser(1);
    if(value === 'participante')
      setUser(2);
  };

  const logout = () => {
    setUser(-1)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home logout={logout}/>} />
        <Route path="/AccesoYRegistro" element={<AccessoYRegistro add={addUser} read={readUser}/>} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal rol={user} logout={logout}/>} />
      </Routes>
      <Footer />
    </>
  );

  async function addUser (user) {
    console.log(user);
    const response = await fetch('http://127.0.0.1:5000/Registro', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    if (data.error !== undefined) {
      alert("ERROR! " + data.error);
    } else {
      alert("Usuario registrado!");
    }
  }
  
  async function readUser (user) {
    const response = await fetch('http://127.0.0.1:5000/Acceso', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    if (data.error !== undefined) {
      alert("ERROR! " + data.error);
    } else {
      userRole(data.role)
      alert("¡Bienvenido de vuelta " + data.nombre + "!")
      navigate("/PaginaPrincipal")
    }
  }
}

export default App;
