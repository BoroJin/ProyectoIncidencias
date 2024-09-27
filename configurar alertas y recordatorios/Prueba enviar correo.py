import psycopg2
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Conexion a la BD
conn = psycopg2.connect( host="localhost", database="Pruebas", user="admin", password="Ignacio123", port='5432')


def obtener_notificaciones():
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT id_notificaciones, alerta, destinatario, fecha_envio 
            FROM notificaciones 
            WHERE estado = 'pendiente';
        """)
        notificaciones = cur.fetchall()
        cur.close()
        return notificaciones
    except Exception as e:
        print(f"Error al obtener notificaciones: {e}")
        return []


def actualizar_estado(id_notificacion, estado):
    try:
        cur = conn.cursor()
        cur.execute("""
            UPDATE notificaciones
            SET estado = %s
            WHERE id_notificaciones = %s;
        """, (estado, id_notificacion))
        conn.commit()
        cur.close()
    except Exception as e:
        print(f"Error al actualizar el estado de la notificación: {e}")


def enviar_correo(alerta, destinatario, id_notificacion):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "pruebadb277@gmail.com"
    password = "yrlx gxji ciob wyhe " 

    
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = destinatario
    msg["Subject"] = f"Alerta: {alerta}"


    body = f"Estimado/a, ha recibido una alerta con el siguiente mensaje: {alerta}"
    msg.attach(MIMEText(body, "plain"))

    try:
        # Conectar al servidor SMTP
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls() 
        server.login(sender_email, password)
        server.sendmail(sender_email, destinatario, msg.as_string())
        print(f"Correo enviado a {destinatario} sobre la alerta: {alerta}")
        actualizar_estado(id_notificacion, "enviada")  
    except Exception as e:
        print(f"Error al enviar el correo a {destinatario}: {e}")
        actualizar_estado(id_notificacion, "fallida")  
    finally:
        server.quit()


notificaciones_pendientes = obtener_notificaciones()
for id_notificacion, alerta, destinatario, fecha_envio in notificaciones_pendientes:
    enviar_correo(alerta, destinatario, id_notificacion)


conn.close()