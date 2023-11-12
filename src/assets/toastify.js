import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

/**
 * Función de fábrica para crear notificaciones de éxito.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} duration La duración de la notificación.
 * @param {*} close Indica si la notificación se puede cerrar con la cruz.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 * @returns Configuración de Toastify para la notificación de éxito.
 */
function crearNotificacionExito(mensaje, duration, close, colorInicio, colorFin) {
    return {
        text: `${mensaje}`,
        duration: duration,
        className: "info",
        close: close,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: `linear-gradient(to right, ${colorInicio}, ${colorFin})`,
            fontFamily: "Roboto, sans-serif"
        }
    };
}

/**
 * Notificación de éxito que se muestra al usuario en caso de éxito.
 * Se cierra solo después de 5 segundos.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 */
export function exitoCierraSolo(mensaje, colorInicio = "#5A8E3E", colorFin = "#00A605") {
    Toastify(crearNotificacionExito(mensaje, 5000, false, colorInicio, colorFin)).showToast();
}

/**
 * Notificación de éxito que se muestra al usuario en caso de éxito.
 * Requiere que el usuario haga clic en la cruz para cerrarla.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 */
export function exitoCerrar(mensaje, colorInicio = "#5A8E3E", colorFin = "#00A605") {
    Toastify(crearNotificacionExito(mensaje, -1, true, colorInicio, colorFin)).showToast();
}

/**
 * Notificación de advertencia que se muestra al usuario.
 * Se cierra mensaje después de 5 segundos.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 */
export function advertenciaCierraSolo (mensaje, colorInicio = "#FFD700", colorFin = "#FFA500") {
    Toastify(crearNotificacionExito(mensaje, 5000, false, colorInicio, colorFin)).showToast();
}

/**
 * Notificación de peligro que se muestra al usuario.
 * Se cierra mensaje después de 5 segundos.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 */
export function peligroCierraSolo (mensaje, colorInicio = "#ff0000", colorFin = "#b70505") {
    Toastify(crearNotificacionExito(mensaje, 5000, false, colorInicio, colorFin)).showToast();
}

/**
 * Notificación de peligro que se muestra al usuario.
 * Requiere que el usuario haga clic en la cruz para cerrarla.
 * @param {*} mensaje Es el mensaje que se le muestra al usuario.
 * @param {*} colorInicio Color de inicio del gradiente.
 * @param {*} colorFin Color de fin del gradiente.
 */
export function peligroCerrar (mensaje, colorInicio = "#ff0000", colorFin = "#b70505") {
    Toastify(crearNotificacionExito(mensaje, -1, true, colorInicio, colorFin)).showToast();
}