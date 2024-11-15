import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DepartamentoObrasView from "./pages/DepartamentoObras_views";

function MainContent() {
  const location = useLocation();

  // Rutas donde no queremos mostrar la sidebar
  const noSidebarRoutes = ["/"];

  return (
    <div style={{ display: "flex" }}>
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/depto-obras" element={<DepartamentoObrasView />} />
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
