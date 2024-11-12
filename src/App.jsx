// app.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DepartamentoObras_View from "./Page/IndexPage";
import "./index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/departamentoObras" />} />
        <Route path="/departamentoObras" element={<DepartamentoObras_View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
