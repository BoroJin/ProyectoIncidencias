CREATE TABLE notificaciones (
    id_notificaciones SERIAL PRIMARY KEY,
    alerta VARCHAR(50) NOT NULL,
    fecha_envio DATE NOT NULL,
    destinatario VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('enviada', 'pendiente', 'fallida'))
);
