
Creación del entorno:

Tener instalado anaconda
Abrir la ubicación de el archivo en Anaconda Prompt, crear un entorno y activarlo con los siguientes comandos:
    conda create -n elizabeth python==3.7
    conda activate elizabeth

Instalar los requerimentos:
    pip install -r requirements_python.
    npm install axios socket.io-client react-icons react-router-dom bootstrap

Creación y configuración de la base de datos:

Tener instalado PgAdmin
Crear una base de datos
Tener instalado Visual Studio Code y abrir la carpeta del proyecto
Configurar la base de datos en el archivo settings.py (dentro de la carpeta main-project)
    con las configuraciones de la base creada, por ejemplo:

    DATABASES = {
        'default': {
            'HOST':'localhost',
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'equipo 1', # Nombre de la base de datos
            'USER':'postgres', # Nombre del usuario de la bd
            'PASSWORD':'password123', # Contraseña del usuario de la bd
        }
    }
En el ejemplo se configuró una base de datos con nombre "equipo 1" y usuario "postgres" con su respectiva contraseña

Ejecución del proyecto:

Primero se ejecutarán los componentes con React.

Abrir una terminal en Visual Studio Code o en Anaconda Prompt, en ambos casos debe estar activado el entorno.

Dirigirse a la carpeta del proyecto en la terminal y escribir los siguientes comandos:
    cd login
    npm run build

Abrir otra terminal y dirigirse a la carpeta del proyecto en esta, ejecutar los siguientes comandos:
    cd departamentoObras
    npm run build

Abrir otra terminal y dirigirse a la carpeta del proyecto en esta, ejecutar los siguientes comandos:
    cd ticket
    npm run build

Abrir una ultima terminal y dirigirse a la raiz del proyecto, donde se encuentra manage.py
Ejecutar el siguiente comando:
    python manage.py collectstatic

Una vez realizado todos esos comandos, nos dirigimos a la aplicacion de pgadmin para poder ingresar usuarios bases al sistema, donde se ejecutara el archivo SQL "insertar_usuarios" para poder ingresar usuarios al sistema.

Una vez que todo lo anterior está listo, en la ultima terminal que se abrió anteriormente (en la raiz del proyecto)
Ejecutar el siguiente comando:
    python manage.py runserver

Siguiendo todos los pasos el programa deberia estar funcionando correctamente,por lo que debera abrir en un navegador el link que se muestra en la terminal de comandos