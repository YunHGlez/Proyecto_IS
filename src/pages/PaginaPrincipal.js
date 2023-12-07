import React from 'react';
import { useState } from 'react';

import '../assets/styles/PaginaPrincipal.css';
import SuperAdmin from '../components/SuperAdmin.js';
import Header from "../components/Header";
import Participante from '../components/Participante.js';
import Administrador from '../components/Administrador';

const PaginaPrincipal = (props) => {
  const [index, setIndex] = useState(props.rol);
  let content;

  const changeContent = (value) => {
    console.log("CambioModo");
    setIndex(value);
  };

  if(index === 'superAdministrador'){
    content = <SuperAdmin onChangeContent={changeContent} admins={props.list} maxID={props.id}/>
  }
  if(index === 'administrador'){
    content = <Administrador onChangeContent={changeContent} torneos={props.list} maxID={props.id} rules={props.rules}/>
  }
  if(index === 'participante'){
    content = <Participante onChangeContent={changeContent} logout={props.logout} usuario={props.list}/>
  }

  return (
    <>
    <Header isThereButton={false} logoutButton={true} logout={props.logout}/>
    <div className="App bodyJJ">
        {content}
    </div>
    </>
  );
}

export default PaginaPrincipal;
