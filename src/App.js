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
  const [lista, setLista] = useState(initList)
  const [user, setUser] = useState(initUser)
  const [id, setId] = useState(initID)
  const [rules, setRules] = useState(initRules)

  const navigate = useNavigate()

  const userRole = (user, list, id, reglas) => {
    sessionStorage.setItem("listData", JSON.stringify(list))
    sessionStorage.setItem("userData", user)
    sessionStorage.setItem("userID", id)
    sessionStorage.setItem("rules", JSON.stringify(reglas))

    setLista(list)
    setUser(user)
    setId(id)
    setRules(reglas)
  };

  const logout = () => {
    setUser(-1)
    navigate("/")
    sessionStorage.clear()
  }
 
  function initList(){
    if(sessionStorage.getItem("listData")){
      return JSON.parse(sessionStorage.getItem("listData"))
    }
    else
      return []
  }

  function initUser(){
    if(sessionStorage.getItem("userData")){
      return sessionStorage.getItem("userData")
    }
    else
      return 'null'
  }

  function initID(){
    if(sessionStorage.getItem("userID")){
      return sessionStorage.getItem("userID")
    }
    else
      return -1
  }

  function initRules(){
    if(sessionStorage.getItem("rules")){
      return JSON.parse(sessionStorage.getItem("rules"))
    }
    else
      return []
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home logout={logout}/>} />
        <Route path="/AccesoYRegistro" element={<AccessoYRegistro add={addUser} read={readUser}/>} />
        <Route path="/PaginaPrincipal" element={<PaginaPrincipal rol={user} 
              logout={logout} list={lista} id={id} rules={rules}/>} />
      </Routes>
      <Footer />
    </>
  );

  async function addUser (user) {
    const response = await fetch('http://127.0.0.1:5000/Registro', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type':'application/json'
      }
    });
    const data = await response.json();
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
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
    if (data.error !== undefined) {
      alert("ERROR: " + data.error);
    } else {
      userRole(data.role, data.list, data.maxid, data.rules)
      alert("¡Bienvenido de vuelta " + data.nombre + "!")
      navigate("/PaginaPrincipal")
    }
  }

}


export default App;
