import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/styles/components/Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    const socialIcons = ["fab fa-facebook", "fab fa-twitter-square", "fab fa-youtube"];
    const recursos = ["Empleo", "Compañía", "Política de contenido de fans", "Estado del servidor", "Estudio de experiencias de usuario", "Servicios en Línea", "Reglas de la comunidad", "Epic Newsroom"];
    const recursosDos = ["Términos de Servicio", "Política de Privacidad", "Política de Cookies", "Seguridad de la Cuenta"];
    const consolas = ["fab fa-xbox", "fab fa-playstation", "fas fa-gamepad", "fas fa-desktop", "fas fa-mobile"];
    return (
        <footer className="footer-container">
            <div className="social-media-container">
                <Link to ="/">
                    {
                        socialIcons.map((icon, index) => {
                            return <FontAwesomeIcon className="social-media" key={index} icon={icon} />
                        })
                    }
                </Link>
            </div>
            <h2>RECURSOS</h2>
            <ul className="recursos-conatiner">
                <li>
                    {
                        recursos.map((recurso, index) => {
                            return <Link key={index} to ="/">{recurso}</Link>
                        })
                    }
                </li>
            </ul>
            <h2>CREADO POR EMPRESAURIOS</h2>
            <p>© 2023, Epic Clash Hub, Inc. Todos los derechos reservados. Epic, Epic Clash y el logotipo de Epic Clash Hub 
                son marcas comerciales o marcas registradas de Epic Clash Hub, Inc. en México 
                como en el resto del mundo. Otras marcas o nombres de productos son marcas comerciales de sus 
                respectivos propietarios.
            </p>
            <ul className="recursos-dos-container">
                <li>
                    {
                        recursosDos.map((recurso, index) => {
                            return <Link key={index} to ="/">{recurso}</Link>
                        })
                    }
                </li>
            </ul>
            <div className="consolas-container">
                {
                    consolas.map((consola, index) => {
                        return <FontAwesomeIcon className="consolas" key={index} icon={consola} />
                    })
                }
            </div>
        </footer>
    );
};

export default Footer;
