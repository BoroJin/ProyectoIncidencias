# Seting.py 

from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent



SECRET_KEY = 'django-insecure-x_xt0#e09^3b$_d^&r^osz()1ibc@57l*bk-sd!yzxbcg@q^z-'

DEBUG = True

ALLOWED_HOSTS = []




INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'administrador', ##se agrego
    'resolutor',
    'gestor_territorial',
    'director',
    'cuenta',
    'rest_framework',
    'corsheaders',
    'Dobras',
    
]
CORS_ALLOW_ALL_ORIGINS = True

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

AUTH_USER_MODEL = 'cuenta.Usuario'

ROOT_URLCONF = 'main-project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR ],

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'administrador.context_processors.logo_context',  # Añadir aquí tu context processor

            ],
        },
    },
]

WSGI_APPLICATION = 'main-project.wsgi.application'



DATABASES = {  #base de datos para postgres /#aqui modificar a la de cada uno
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'Desarrolloweb1',
        'USER': 'postgres',
        'PASSWORD': 'lolandmine1',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}




AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]




LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




#origina# STATIC_URL = 'static/' ##se modifico

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'resolutor', 'static', 'resolutor'),
    os.path.join(BASE_DIR, 'login', 'build', 'static'),
    os.path.join(BASE_DIR, 'DepartamentoObras', 'dist','assets'),
    
    ]




DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#para que se pueda importar las imagenes desde la carpeta
MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# /DepartamentoObras/dist/indext.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Incidencias</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <script type="module" crossorigin src="/static/index-Cb66msCb.js"></script>
    <link rel="stylesheet" crossorigin href="/static/index-iuf0h0xU.css">
  </head>
  <body>
    <div id="root"></div>
    <a href="http://localhost:3002/" class="btn btn-float">
      <img
        src="https://cdn-icons-png.freepik.com/512/2593/2593342.png"
        alt="Ícono"
        class="icono-btn"
      />
      Soporte técnico
    </a>
  </body>
</html>

# El problema viso por consola 
PS C:\Users\benpi\OneDrive - Universidad Autónoma de Chile\Escritorio\OctavoSemestre\DesarrolloDeAplicacionesWeb\Github\ProyectoIncidencias> python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified some issues:

WARNINGS:
?: (staticfiles.W004) The directory 'C:\Users\benpi\OneDrive - Universidad Autónoma de Chile\Escritorio\OctavoSemestre\DesarrolloDeAplicacionesWeb\Github\ProyectoIncidencias\DepartamentoObras\dist\assets' in the STATICFILES_DIRS setting does not exist.
?: (staticfiles.W004) The directory 'C:\Users\benpi\OneDrive - Universidad Autónoma de Chile\Escritorio\OctavoSemestre\DesarrolloDeAplicacionesWeb\Github\ProyectoIncidencias\static' in the STATICFILES_DIRS setting does not exist.

System check identified 2 issues (0 silenced).
November 30, 2024 - 20:14:39
Django version 5.1.3, using settings 'main-project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

[30/Nov/2024 20:14:43] "GET /depto-obras/ HTTP/1.1" 200 756
[30/Nov/2024 20:14:43] "GET /static/index-Cb66msCb.js HTTP/1.1" 404 1865
[30/Nov/2024 20:14:43] "GET /static/index-iuf0h0xU.css HTTP/1.1" 404 1868
Not Found: /favicon.ico
[30/Nov/2024 20:14:43] "GET /favicon.ico HTTP/1.1" 404 3999
#