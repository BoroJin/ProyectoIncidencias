
import psycopg2

try:
    connection = psycopg2.connect(
        dbname='nombre_de_tu_base_de_datos',
        user='tu_usuario',
        password='tu_contraseña',
        host='localhost',
        port='5432'
    )
    print("Conexión exitosa")
except Exception as e:
    print(f"Error de conexión: {e}")
finally:
    if 'connection' in locals():
        connection.close()