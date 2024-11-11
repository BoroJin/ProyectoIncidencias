import React from 'react';
import { Link, useLocation } from "react-router-dom";
import '../App.css';

function Sidebar() {
    const location = useLocation();

    const getMenuOptions = () => {
        switch (location.pathname) {
            case "/admin":
                return (
                    <>
                        <li><Link to="/admin">Inicio</Link></li>
                        <li><Link to="/admin/gestion-usuarios">Gestión de usuarios</Link></li>
                        <li><Link to="/admin/auditoria">Registros de auditoría</Link></li>
                        <li><Link to="/admin/logo">Actualizar logo</Link></li>
                    </>    
                );
            case "/depto-obras":
                return (
                    <>
                        <li><Link to="/depto">Inicio</Link></li>
                        <li><Link to="/depto-obras/option1">Departamento Obras Option 1</Link></li>
                        <li><Link to="/depto-obras/option2">Departamento Obras Option 2</Link></li>
                    </>
                );
            case "/director":
                return (
                    <>
                        <li><Link to="/director">Inicio</Link></li>
                        <li><Link to="/director/incidencias">Incidencias</Link></li>
                        <li><Link to="/director/formulario">Formulario</Link></li>
                    </>
                );
            case "/gestor-territorial":
                return (
                    <>
                        <li><Link to="/gestor-territorial/incidencias">Inicio</Link></li>
                        <li><Link to="/gestor-territorial/incidencias">Lista de Incidencias</Link></li>
                        <li><Link to="/gestor-territorial/option2">Option 2</Link></li>
                    </>
                );
            case "/resolutor":
                return (
                    <>
                        <li><Link to="/resolutor">Inicio</Link></li>
                        <li><Link to="/resolutor/incidencias">Incidencias asignadas</Link></li>
                        <li><Link to="/resolutor/reporte">Generar reporte</Link></li>
                    </>
                );
            default:
                return (
                    <>
                        <li><Link to="/">Home</Link></li>
                    </>
                );
        }
    };

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                <a class="nav-link">
                {getMenuOptions()}
                </a>
            </ul>
        </div>
    );
}

export default Sidebar;