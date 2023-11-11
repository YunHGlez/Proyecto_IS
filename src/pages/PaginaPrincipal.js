import React from 'react';
import { useState } from 'react';

import '../assets/styles/PaginaPrincipal.css';
import SuperAdmin from '../components/SuperAdmin.js';
import Header from "../components/Header";
import Participante from '../components/Participante.js';

const PaginaPrincipal = (props) => {
  const [index, setIndex] = useState(props.rol);
  let content;

  const changeContent = (value) => {
    console.log("CambioModo");
    setIndex(value);
  };

  if(index === 0){
    content = <SuperAdmin onChangeContent={changeContent}/>
  }
  if(index === 1){
    content = <p>Administrador</p>
  }
  if(index === 2){
    content = <Participante onChangeContent={changeContent}/>
  }

  return (
    <>
    <Header isThereButton={false} logoutButton={true} logout={props.logout}/>
    <div className="App bodyJJ">
        <div className= "navbar_header" id="navbar">
          <button className='buttonJJ' id="navelem" onClick={() => { changeContent(0); }}> 
            SuperAdmin</button>
          <button className='buttonJJ' id="navelem" onClick={() => { changeContent(1); }}> 
            Administrador</button>
          <button className='buttonJJ' id="navelem" onClick={() => { changeContent(2); }}> 
            Participante</button>
        </div>
        {content}
    </div>
    </>
  );
}

export default PaginaPrincipal;
