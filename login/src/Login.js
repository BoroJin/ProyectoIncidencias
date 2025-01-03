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
    
        try {
            const response = await fetch('http://localhost:8000/cuenta/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                
                // Guardar tokens y nombre de usuario en localStorage
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('user_name', data.user_name); // Guardar el nombre del usuario, para R.auditoria
                localStorage.setItem('user_id', data.user_id);
                
                if (data.redirect_url) {
                    // Establecer cookies con tiempo de expiración de 30 días
                    const expires = new Date();
                    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 días en milisegundos
                    
                    document.cookie = `user_id=${data.user_id}; path=/; expires=${expires.toUTCString()};`;
                    document.cookie = `user_name=${data.user_name}; path=/; expires=${expires.toUTCString()};`;
                    
                    // Redirigir al usuario
                    redirectToDjango(data.redirect_url);
                }
            } else {
                const errorData = await response.json();
                console.error('Error en login:', errorData);
                setError('Login fallido. Verifique sus credenciales.');
            }
        } catch (error) {
            console.error('Error al procesar el login:', error);
            setError('Error de conexión. Intente nuevamente más tarde.');
        }
    };
    
    // Función para redirigir al servidor Django, para registro de auditoria
    const redirectToDjango = (redirectUrl) => {
        const userName = localStorage.getItem('user_name');
        
        window.location.href = redirectUrl;
        }
    

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
