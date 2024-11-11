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
                const response = await fetch('http://localhost:8000/api/configuracion/');
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

        const response = await fetch('http://localhost:8000/api/cuenta/login/', {
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

                    <img src={`http://localhost:8000${config.imagen}`} alt="Logo" />

                    {error && <p>{error}</p>}
                </div>
            </div>
        </main>
    );
}

export default Login;
