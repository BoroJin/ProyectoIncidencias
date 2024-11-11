import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import 'leaflet/dist/leaflet.css';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomeView from "./views/Home";
import AdminView from "./views/Admin_view";
import DepartamentoObrasView from "./views/DepartamentoObras_view";
import DirectorView from "./views/Director_view";
import GestorTerritorialView from "./views/GestorTerritorial_view";
import ResolutorView from "./views/Resolutor_view";

function MainContent() {
  const location = useLocation();

  // Rutas donde no queremos mostrar la sidebar
  const noSidebarRoutes = ['/'];

  return (
      <div style={{ display: "flex" }}>
          {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
          <div style={{ flex: 1, padding: "20px" }}>
              <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/admin" element={<AdminView />} />
                  <Route path="/depto-obras" element={<DepartamentoObrasView />} />
                  <Route path="/director" element={<DirectorView />} />
                  <Route path="/gestor-territorial" element={<GestorTerritorialView />} />
                  <Route path="/resolutor" element={<ResolutorView />} />
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
