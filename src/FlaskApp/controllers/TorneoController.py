from flask import Blueprint, request, render_template, redirect, url_for, flash
from model.modeloTorneo import get_all_torneos
from model.modeloTorneo import get_torneo_by_id
from model.modeloTorneo import add_torneo
from model.modeloTorneo import update_torneo
from model.modeloTorneo import delete_torneo

torneo = Blueprint('torneo', __name__, url_prefix='/torneo')

@torneo.route('/')
def torneo_controller():
    return render_template('torneo.html', torneo = get_all_torneos())

@torneo.route('/actualizar/<string:id>', methods=('GET', 'POST'))
def actualizar_torneo(id):
    if request.method == 'POST':
        id_torneo = request.form['id']
        nombreTorneo = request.form['nombre']
        numParticipantes = request.form['participantes']
        juego = request.form['juego']
        fechaInicio = request.form['inicio']
        fechaFin = request.form['fin']
        consola = request.form['consola']
        correoUsuario = request.form['correo']
        status1 = update_torneo(id_torneo, nombreTorneo, numParticipantes, juego, fechaInicio, fechaFin, consola, correoUsuario)
        return redirect(url_for('torneo.torneo_controller'))
    else:
        torneo = get_torneo_by_id(int(id))
        return render_template('torneo.html', torneos = get_all_torneos(), torneo=torneo)

@torneo.route('/agregar', methods=('GET', 'POST'))
def registrar_torneo():
    if request.method == 'POST':
        id_torneo = request.form['id']
        nombreTorneo = request.form['nombre']
        numParticipantes = request.form['participantes']
        juego = request.form['juego']
        fechaInicio = request.form['inicio']
        fechaFin = request.form['fin']
        consola = request.form['consola']
        correoUsuario = request.form['correo']
        status1 = add_torneo(id_torneo, nombreTorneo, numParticipantes, juego, fechaInicio, fechaFin, consola, correoUsuario)
        return redirect(url_for('torneo.torneo_controller'))

@torneo.route('/eliminar/<string:id>', methods = ('GET', 'POST'))
def eliminar_torneo(id):
    status = delete_torneo(id)
    return redirect(url_for('torneo.torneo_controller'))