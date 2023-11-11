import React from "react";
import '../assets/styles/components/Panel.css';
import Logo from '../assets/images/logo.jpg';

const Panel = (props) => {
    return (
        <div className={`overlay-panel ${props.typePanel}`}>
            <img className="logo-panel" src={Logo} alt="Logo" />
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <button className="ghost" id={props.idButton}>{props.button}</button>
        </div>
    );
};

export default Panel;
