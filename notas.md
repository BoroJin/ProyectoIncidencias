Tengo dos app en react "login" y "departamentoObras"
"Login" Se encarga de mostrar una vista para realizar la authenticacion
la vista envia los datos al backend, para confirmar el acceso

La otra vista es "departamentoObras" que tiene varias cosas, pero deberia funcionar bien
ya que en react funciona bien.

No logro servir correctamente desde django, la vista del "departamentoObras", por otro lado "login"
si funciona correctamente.

A continuacion te pasare todo el contexto que creo necesario... revisalo y dime por que no funciona.

# De npm run build
## Login
### login.js
// Login.js
import React, { useState, useEffect } from 'react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [config, setConfig] = useState({ nombre_municipalidad: '', imagen: '' });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('http://localhost:8000/administrador/api/configuracion/');
                if (response.ok) {
                    const data = await response.json();
                    setConfig(data);
                } else {
                    console.error('Error al obtener la configuración.');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            }
        };

        fetchConfig();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const response = await fetch('http://localhost:8000/cuenta/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            if (data.redirect_url) {
                window.location.href = data.redirect_url;
            }

        } else {
            const errorData = await response.json();
            console.error('Error en login:', errorData);
            setError('Login fallido. Verifique sus credenciales.');
        }

    };

    return (

        <main className='justify-content-center align-items-center'>
            <div className='card text-center text-decoration-none shadow' >
                <div className='card-body'>
                    <h1><label className='nombre'>{config.nombre_municipalidad}</label></h1>
                    <h6 className='hola card-title'>Inicio de Sesion</h6>
                    <form onSubmit={handleLogin}>
                        <div className='hi'>
                            <div>
                                <div>
                                    <label>Correo electrónico:</label>
                                </div>
                                <div>
                                    <input
                                        className='correo'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Ingrese su correo electrónico'
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Contraseña:</label>
                                </div>
                                <div>
                                    <input
                                        className='contra'
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Ingrese su contraseña'
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className='btn'>Ingresar</button>
                    </form>
                    <div>
                        <a href="http://127.0.0.1:8000/cuenta/recuperacion/" class="recuperacontra"> ¿Has olvidado tu contraseña? </a>
                    </div>
                    <img src={`http://localhost:8000${config.imagen}`} alt="Logo" />

                    {error && <p>{error}</p>}
                </div>
            </div>
        </main>
    );
}

export default Login;
### Estructura de carpetas
login
├── build
│   ├── static
│   │   ├── css
│   │   │   ├── main.da7dcd70.css
│   │   │   ├── main.da7dcd70.css.map
│   │   ├── js
│   │   │   ├── 453.ed3810f9.chunk.js
│   │   │   ├── 453.ed3810f9.chunk.js.map
│   │   │   ├── main.854dede2.js
│   │   │   ├── main.854dede2.js.LICENSE.txt
│   │   │   ├── main.854dede2.js.map
│   ├── asset-manifest.json
│   ├── index.html
├── node_modules
├── public
├── src
├── .gitignore
├── package-lock.json
├── package.json
├── README.md

## departamentoObras
### App.jsx 
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DepartamentoObrasView from "./pages/DepartamentoObras_views";
import AsignarResolutor from "./pages/AsignarResolutor";

function MainContent() {
  const location = useLocation();

  // Rutas donde no queremos mostrar la sidebar
  const noSidebarRoutes = ["/"];

  return (
    <div style={{ display: "flex" }}>
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/depto-obras" />} />
          <Route path="/depto-obras" element={<DepartamentoObrasView />} />
          <Route path="/depto-obras/option1" element={<AsignarResolutor />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <MainContent />
    </Router>
  );
}

export default App;
"
















lo sigueinte es su app.jsx donde se configuran las rutas
"
### vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/static/', // Asegúrate de que los archivos estáticos tengan un prefijo
  build: {
    outDir: './dist',
    assetsDir: 'assets',
  },
  plugins: [react()],
});
### Estructura de carpetas
departamentoObras
├── dist
│   ├── assets
│   │   ├── index-iUf0h0xU.css
│   │   ├── index-LK31uvlX.js
│   ├── index.html
│   ├── vite.svg
├── node_modules
├── public
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── pages
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── requisitosDOb.txt
├── vite.config.js


# Del backend django
## Urls.py de mainProject
from . import views
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('administrador/', include('administrador.urls')),  # 'administrador' es el nombre de tu app
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cuenta/', include('cuenta.urls')),
    path('resolutor/', include('resolutor.urls')),
    path('gestor_territorial/', include('gestor_territorial.urls')),
    path('director/', include('director.urls')),
    path('depto-obras/', views.departamentoObra, name='departamentoObras'),
    path('', views.departamentoObra, name='departamentoObras'),
    re_path(r'^.*$', views.departamentoObra, name='departamentoObras'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
## views.py de mainProject
from django.shortcuts import render
from django.views.generic import TemplateView

def login(request):
    return render(request, 'index.html')

class ReactAppView(TemplateView):
    template_name = 'index.html'

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
## views.py de la app cuenta
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Usuario, Ticket
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.conf import settings
from django.urls import reverse
from django.contrib import messages
from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def crear_ticket(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            correo_electronico = data.get("correo_electronico")
            asunto = data.get("asunto")
            descripcion = data.get("descripcion")
            
            # Verificar si el correo existe en la tabla de usuarios
            usuario = Usuario.objects.filter(correo_electronico=correo_electronico).first()
            if not usuario:
                return JsonResponse({"error": "El correo no está registrado"}, status=400)

            # Crear el ticket
            Ticket.objects.create(
                usuario=usuario,
                asunto=asunto,
                descripcion=descripcion
            )

            return JsonResponse({"success": "Ticket creado con éxito"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Verifica si el usuario existe
        try:
            user = Usuario.objects.get(correo_electronico=email)
            if user.password == password:
                refresh = RefreshToken.for_user(user)
                refresh = RefreshToken.for_user(user)
                    
                # Define las URLs de redirección según el rol
                redirect_url = ''
                if user.rol == 'Administrador':
                    redirect_url = 'http://127.0.0.1:8000/administrador/adm_principal/'
                elif user.rol == 'Resolutor': 
                    redirect_url = 'http://127.0.0.1:8000/resolutor/'
                elif user.rol == 'Director':  
                    redirect_url = 'http://127.0.0.1:8000/director/'
                elif user.rol == 'Gestor Territorial':    
                    redirect_url = 'http://127.0.0.1:8000/gestor_territorial/'
                elif user.rol == 'Departamento de obras':      
                    redirect_url = 'http://127.0.0.1:8000/depto-obras/'

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'redirect_url': redirect_url 
                })
            else:
                return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
## urls.py de la app cuenta
from django.urls import path, re_path
from . import views
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('recuperacion/', views.adm_recuperacion, name='adm_recuperacion'), 
    path('recuperar/', views.restablecer_contra, name='recuperar'),
    path('restablecer/<int:user_id>/', views.restablecer, name='restablecer'),
    path("crear-ticket/", views.crear_ticket, name="crear_ticket"),
    
]
## Setting.py del proyecto django
"
"""
Django settings for app project.

Generated by 'django-admin startproject' using Django 5.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

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
    
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]
AUTH_USER_MODEL = 'cuenta.Usuario'
ROOT_URLCONF = 'main-project.urls'
CORS_ALLOW_ALL_ORIGINS = True
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
             os.path.join(BASE_DIR, 'login/build'),
             os.path.join(BASE_DIR, 'departamentoObras', 'dist'),
        ],
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
    os.path.join(BASE_DIR, "login/build/static"),
    os.path.join(BASE_DIR, 'departamentoObras/dist'),
    ]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

#para que se pueda importar las imagenes desde la carpeta
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

"


Esa es la configuracion del archivo vite.config que entiendo se aplica cuando se crea el build
## Consola
Esta es la salida por consola cuando solicito la pagina...
Cuando solicito la pagina, esta no se muestra como se debe en vez de mostrarme la pagina, me sigue mostrando
/
"
PS C:\Users\benpi\OneDrive - Universidad Autónoma de Chile\Escritorio\OctavoSemestre\DesarrolloDeAplicacionesWeb\Github\ProyectoIncidencias> python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
November 29, 2024 - 17:31:31
Django version 5.1.3, using settings 'main-project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

[29/Nov/2024 17:31:38] "GET / HTTP/1.1" 200 640
[29/Nov/2024 17:31:39] "GET /manifest.json HTTP/1.1" 200 640
[29/Nov/2024 17:31:39] "GET /administrador/api/configuracion/ HTTP/1.1" 200 41
[29/Nov/2024 17:31:39,309] - Broken pipe from ('127.0.0.1', 61258)
[29/Nov/2024 17:31:48] "POST /cuenta/login/ HTTP/1.1" 200 541
[29/Nov/2024 17:31:48] "GET /depto-obras/ HTTP/1.1" 200 640
[29/Nov/2024 17:31:48] "GET /administrador/api/configuracion/ HTTP/1.1" 200 41
[29/Nov/2024 17:31:48] "GET /manifest.json HTTP/1.1" 200 640
[29/Nov/2024 17:31:48,793] - Broken pipe from ('127.0.0.1', 61261)
"
# Comentarios
Como es react vite, la carpeta creada es dist
Ademas se debe tener en consideracion que son vistas de react, una es login y la otra es DepartamentoObras
A que se debe que no funciona como se espera ? 