-- Poblacion de la tabla usuario
USE practica5;
INSERT INTO Usuario (nombreUsuario, correo, contraseña, rol) VALUES
('Root', 'root@gmail.com', 'e95fb3c63e1d451ba720d439f4a37f4059caf91233b451e8bc760aefa21be5b0', 'superAdministrador'),
('Luis', 'luis@example.com', 'contrasenaLuis', 'participante'),
('Juan', 'juan@example.com', 'contrasenaJuan', 'participante'),
('Estrella', 'estrella@example.com', 'contrasenaEstrella', 'administrador'),
('Ana', 'ana@example.com', 'contrasenaAna', 'participante'),
('Miguel', 'miguel@example.com', 'contrasenaMiguel', 'superAdministrador'),
('Maria', 'maria@example.com', 'contrasenaMaria', 'participante'),
('Carlos', 'carlos@example.com', 'contrasenaCarlos', 'administrador'),
('Elena', 'elena@example.com', 'contrasenaElena', 'participante'),
('Pedro', 'pedro@example.com', 'contrasenaPedro', 'participante'),
('Laura', 'laura@example.com', 'contrasenaLaura', 'participante'),
('Sofia', 'sofia@example.com', 'contrasenaSofia', 'superAdministrador'),
('Diego', 'diego@example.com', 'contrasenaDiego', 'participante'),
('Julia', 'julia@example.com', 'contrasenaJulia', 'administrador'),
('Victor', 'victor@example.com', 'contrasenaVictor', 'participante'),
('Isabel', 'isabel@example.com', 'contrasenaIsabel', 'participante'),
('Raul', 'raul@example.com', 'contrasenaRaul', 'superAdministrador'),
('Natalia', 'natalia@example.com', 'contrasenaNatalia', 'participante'),
('Alejandro', 'alejandro@example.com', 'contrasenaAlejandro', 'administrador'),
('Monica', 'monica@example.com', 'contrasenaMonica', 'participante'),
('Roberto', 'roberto@example.com', 'contrasenaRoberto', 'participante'),
('Valeria', 'valeria@example.com', 'contrasenaValeria', 'superAdministrador'),
('Gabriel', 'gabriel@example.com', 'contrasenaGabriel', 'participante'),
('Leticia', 'leticia@example.com', 'contrasenaLeticia', 'administrador'),
('Oscar', 'oscar@example.com', 'contrasenaOscar', 'participante'),
('Carmen', 'carmen@example.com', 'contrasenaCarmen', 'participante'),
('Daniel', 'daniel@example.com', 'contrasenaDaniel', 'superAdministrador'),
('Silvia', 'silvia@example.com', 'contrasenaSilvia', 'participante'),
('Alberto', 'alberto@example.com', 'contrasenaAlberto', 'administrador'),
('Eva', 'eva@example.com', 'contrasenaEva', 'participante'),
('Javier', 'javier@example.com', 'contrasenaJavier', 'participante');

-- Poblacion de la tabla torneo
USE practica5;
INSERT INTO Torneo (numParticipantes, juego, fechaInicio, fechaFin, nombreTorneo, consola, correo, estatus) VALUES
(50, 'Fortnite', '2023-07-01', '2023-07-15', 'Torneo Fortnite Verano', 'Xbox', 'luis@example.com', 'activo'),
(32, 'League of Legends', '2023-08-05', '2023-08-20', 'Liga LOL', 'PC', 'juan@example.com', 'en proceso'),
(40, 'FIFA 23', '2023-09-10', '2023-09-25', 'Copa FIFA', 'Playstation', 'estrella@example.com', 'activo'),
(24, 'Call of Duty: Warzone', '2023-10-15', '2023-10-30', 'Warzone Challenge', 'PC', 'ana@example.com', 'finalizado'),
(60, 'Overwatch', '2023-11-20', '2023-12-05', 'Gran Torneo Overwatch', 'Xbox', 'miguel@example.com', 'activo'),
(48, 'Dota 2', '2024-01-01', '2024-01-15', 'Torneo Dota 2', 'PC', 'maria@example.com', 'en proceso'),
(35, 'Rocket League', '2024-02-10', '2024-02-25', 'Rocket League Cup', 'Playstation', 'carlos@example.com', 'activo'),
(28, 'Counter-Strike: Global Offensive', '2024-03-05', '2024-03-20', 'CS:GO Masters', 'PC', 'elena@example.com', 'en proceso'),
(45, 'Minecraft', '2024-04-15', '2024-04-30', 'Minecraft Challenge', 'Xbox', 'pedro@example.com', 'activo'),
(38, 'Apex Legends', '2024-05-10', '2024-05-25', 'Apex Legends Tournament', 'PC', 'laura@example.com', 'finalizado'),
(55, 'Rainbow Six Siege', '2024-06-20', '2024-07-05', 'Siege Showdown', 'Playstation', 'sofia@example.com', 'activo'),
(42, 'World of Warcraft', '2024-08-01', '2024-08-15', 'WoW Arena Championship', 'PC', 'diego@example.com', 'en proceso'),
(30, 'NBA 2K24', '2024-09-10', '2024-09-25', 'NBA 2K Championship', 'Xbox', 'julia@example.com', 'activo'),
(22, 'Hearthstone', '2024-10-05', '2024-10-20', 'Hearthstone Masters', 'PC', 'victor@example.com', 'finalizado'),
(65, 'Smite', '2024-11-15', '2024-11-30', 'Smite Clash', 'Playstation', 'isabel@example.com', 'activo'),
(52, 'Genshin Impact', '2024-12-10', '2024-12-25', 'Impact Winter Tournament', 'PC', 'raul@example.com', 'en proceso'),
(44, 'F1 2024', '2025-01-01', '2025-01-15', 'Formula 1 Racing Challenge', 'Xbox', 'natalia@example.com', 'activo'),
(37, 'Paladins', '2025-02-10', '2025-02-25', 'Paladins Battle', 'PC', 'alejandro@example.com', 'finalizado'),
(58, 'The Elder Scrolls Online', '2025-03-05', '2025-03-20', 'ESO Grand Tournament', 'Playstation', 'monica@example.com', 'activo'),
(29, 'Super Smash Bros. Ultimate', '2025-04-15', '2025-04-30', 'Smash Bros. Showdown', 'Nintendo Switch', 'roberto@example.com', 'en proceso'),
(48, 'Valorant', '2025-05-10', '2025-05-25', 'Valorant Masters', 'PC', 'valeria@example.com', 'activo'),
(36, 'Dungeons & Dragons', '2025-06-20', '2025-07-05', 'D&D Adventure League', 'Tabletop', 'gabriel@example.com', 'en proceso'),
(50, 'Starcraft II', '2025-08-01', '2025-08-15', 'Starcraft II Championship', 'PC', 'leticia@example.com', 'activo'),
(42, 'Fornite Capítulo 3', '2025-09-10', '2025-09-25', 'Fortnite Chapter 3 Showdown', 'Xbox', 'oscar@example.com', 'finalizado'),
(28, 'Among Us', '2025-10-05', '2025-10-20', 'Among Us Impostor Challenge', 'PC', 'carmen@example.com', 'activo'),
(60, 'Rust', '2025-11-15', '2025-11-30', 'Rust Survival Games', 'PC', 'daniel@example.com', 'en proceso'),
(33, 'Apex Legends', '2026-01-01', '2026-01-15', 'New Year Apex Challenge', 'PC', 'eva@example.com', 'activo'),
(25, 'Minecraft', '2026-02-10', '2026-02-25', 'Minecraft Builders Cup', 'Xbox', 'javier@example.com', 'finalizado'),
(48, 'Overwatch', '2026-03-05', '2026-03-20', 'Spring Overwatch Showdown', 'Playstation', 'silvia@example.com', 'activo'),
(55, 'League of Legends', '2026-05-10', '2026-05-25', 'Legends Spring Cup', 'PC', 'natalia@example.com', 'activo');

-- Poblacion para la tabla reglas nombreTorneo
USE practica5;
INSERT INTO Reglas (idTorneo, regla) VALUES
(1, 'No se permite el uso de hacks o trampas en ningún momento del torneo.'),
(1, 'El lenguaje ofensivo y comportamiento no ético no será tolerado.'),
(1, 'Cada participante debe seguir las reglas específicas del juego establecidas para el torneo.'),
(2, 'Se espera que todos los participantes respeten las decisiones de los administradores del torneo.'),
(3, 'El incumplimiento de las reglas puede resultar en la descalificación del torneo.'),
(4, 'Los participantes deben estar presentes y listos para competir en el horario establecido.'),
(4, 'Se recomienda encarecidamente el uso de auriculares para evitar interferencias externas.'),
(5, 'No se permiten pausas prolongadas durante las partidas.'),
(5, 'Cualquier intento de hacer trampa resultará en la descalificación inmediata.'),
(5, 'Los participantes deben tener un comportamiento deportivo y respetuoso.'),
(6, 'No se permite el uso de exploits o bugs conocidos en el juego.'),
(7, 'Los resultados de las partidas son finales y no se aceptarán reclamaciones después del anuncio.'),
(7, 'El uso de cuentas compartidas o prestadas está estrictamente prohibido.'),
(8, 'Cualquier problema técnico debe ser informado a los administradores del torneo de inmediato.'),
(8, 'Se espera que los participantes sigan las normativas de Fair Play establecidas por el torneo.'),
(9, 'No se tolerará el acoso o la discriminación hacia otros participantes.'),
(9, 'Se prohíbe el uso de cualquier forma de trampa o modificación no autorizada.'),
(10, 'El incumplimiento de las reglas de etiqueta puede resultar en sanciones.'),
(11, 'Los participantes deben respetar los tiempos de preparación y descanso establecidos.'),
(12, 'Cualquier disputa será resuelta por los administradores del torneo y su decisión es final.'),
(13, 'El uso de múltiples cuentas para obtener ventaja es una violación de las reglas.'),
(13, 'El comportamiento antideportivo puede resultar en sanciones según la gravedad.'),
(14, 'Los participantes deben seguir las reglas específicas del torneo y del juego.'),
(14, 'El abuso de errores en el juego puede resultar en penalizaciones.'),
(15, 'Las trampas de cualquier tipo están estrictamente prohibidas.'),
(15, 'Se espera que los participantes sigan el código de conducta establecido por el torneo.'),
(15, 'No se permiten insultos o comportamientos ofensivos hacia otros participantes.'),
(16, 'El uso de exploits para obtener una ventaja injusta está prohibido.'),
(17, 'Los participantes deben respetar los plazos de registro y check-in establecidos.'),
(18, 'Se espera que los participantes respeten la integridad del juego y a otros jugadores.'),
(19, 'Los participantes deben seguir las instrucciones de los administradores del torneo en todo momento.'),
(19, 'Se espera que los jugadores respeten el espacio personal de los demás durante los eventos presenciales.'),
(20, 'El uso de cualquier forma de trampa de hardware o software está prohibido.'),
(20, 'La participación en múltiples torneos simultáneamente está sujeta a las reglas específicas del torneo.'),
(20, 'Cualquier forma de colaboración no autorizada entre participantes está estrictamente prohibida.'),
(21, 'Los jugadores deben tener una conexión a Internet estable durante todo el torneo.'),
(22, 'La difusión de información falsa o engañosa puede resultar en sanciones.'),
(23, 'El uso de nombres de usuario ofensivos o inapropiados no está permitido.'),
(24, 'La participación en eventos clasificatorios no autorizados puede resultar en descalificación.'),
(24, 'Se espera que los participantes mantengan un comportamiento respetuoso en todas las interacciones.'),
(24, 'El cambio de identidad durante el torneo sin notificación previa está prohibido.'),
(25, 'Los participantes deben cumplir con las políticas de privacidad y seguridad del torneo.'),
(25, 'El incumplimiento de las reglas de Fair Play puede resultar en penalizaciones.'),
(26, 'La violación de derechos de autor en cualquier forma no será tolerada.'),
(27, 'Los participantes deben respetar los tiempos de descanso establecidos por el torneo.'),
(27, 'Cualquier forma de acoso, ya sea en línea o fuera de línea, no será tolerada.'),
(27, 'El uso de macros u otros dispositivos automatizados está prohibido.'),
(28, 'Los participantes deben tener un comportamiento profesional en las comunicaciones oficiales.'),
(28, 'El uso de contenido ofensivo en avatares o imágenes de perfil no está permitido.'),
(29, 'Se espera que los jugadores informen cualquier problema técnico de inmediato.'),
(29, 'El incumplimiento de las reglas puede resultar en la pérdida de premios y reconocimientos.'),
(30, 'El uso de cuentas de otras personas está estrictamente prohibido.'),
(30, 'Los participantes deben cumplir con las políticas de edad establecidas para el torneo.'),
(30, 'La suplantación de identidad está prohibida y resultará en descalificación.'),
(30, 'Los participantes deben respetar las reglas específicas del juego establecidas por los desarrolladores.');