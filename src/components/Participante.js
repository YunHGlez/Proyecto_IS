import React from 'react';
import '../assets/styles/components/Participante.css';
import { exitoCerrar } from  '../assets/toastify';

const Participante = () => {
    return (
        <>
            <p className='pruebita'>Participante</p>
            <button className='prebitaa' onClick={exitoCerrar("EXITO CERRAR")}>CLICK</button>
        </>
    );
};

export default Participante;
