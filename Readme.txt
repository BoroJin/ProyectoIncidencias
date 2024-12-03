Primero debe de crearse un entorno en anaconda con el siguiente comando:

conda create --name proyecto python==3.11.8

luego de crear el entorno y activarlo con:

conda activare proyecto

se debe instalar las dependencias necesarias donde en el archivo requirements_python estaran todas las
dependencias de Python utilizadas y en consola se debe poner:

pip install -r requirements_python.txt

y para instalar las de java se debe utilizar, se deben instalar manualmente las cuales son:

npm install axios socket.io-client react-icons react-router-dom bootstrap
npm install folium

Una vez instaladas todas las dependencias necesarias, en la carpeta de proyecto, en la raiz donde se 
encuentre el archivo manage.py, en settings se debe configurar la base de datos a utilizar, donde se 
utilizara postgreSQL.
Ya puesto esos datos debe correr los siguientes comandos:

py manage.py makemigrations
py manage.py migrate

Para poder migrar todas las tablas creadas en los models de cada una de las carpetas de Django.
Luego para poder correr el programa en las carpetas de React en cada una se debe correr el siguiente codigo

npm run build

Donde primero se comienza con:

cd login
npm run build

En otra terminal:

cd departamentoObras
npm run build

y en una ultima terminal:

cd ticket
npm run build

una vez hecho esos comandos, volvemos a la raiz de la carpeta donde se encuentra el manage.py, y ejecutamos el 
siguiente comando

py manage.py collectstatic 

Una vez realizado todos esos comandos, nos dirigimos a la aplicacion de pgadmin para poder ingresar usuarios bases al sistema, donde se ejecutara el archivo SQL "insertar_usuarios" para poder ingresar usuarios al sistema.
Ya teniendo todo eso listo nos dirijimos a la raiz donde se encuentra el manage.py y ejecutamos la aplicacion con:

py manage.py runserver

Y con eso el programa deberia funcionar correctamente.




