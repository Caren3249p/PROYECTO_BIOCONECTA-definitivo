import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

// 🔐 Autenticación
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Perfil from "./pages/auth/Perfil.jsx";

// 🧠 Dashboard y módulos internos
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Proyectos from "./pages/dashboard/Proyectos.jsx";
import Reportes from "./pages/dashboard/Reportes.jsx";
import Tareas from "./pages/dashboard/Tareas.jsx";
import Historial from "./pages/dashboard/Historial.jsx";
import Logs from "./pages/dashboard/Logs.jsx";
import Interfaz from "./pages/dashboard/Interfaz.jsx";

// 🌐 Páginas públicas
import Home from "./pages/public/Home.jsx";
import QuienesSomos  from "./pages/public/quienessomos.jsx";
import Servicios from "./pages/public/Servicios.jsx";
import Unete from "./pages/public/Unete.jsx";

// 📜 Páginas legales
import PoliticaPrivacidad from "./pages/legal/PoliticaPrivacidad.jsx";
import TerminosUso from "./pages/legal/TerminosUso.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Otras rutas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/unete" element={<Unete />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-uso" element={<TerminosUso />} />
          <Route path="/perfil" element={<Perfil />} />

          {/* Página 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen text-center text-white">
                <div>
                  <h1 className="text-6xl font-bold mb-4">404</h1>
                  <p className="text-xl mb-8 text-gray-300">Página no encontrada</p>
                  <Navigate to="/" replace />
                </div>
              </div>
            }
          />
        </Routes>
      </main>

      {/* 👇 Solo un Footer aquí */}
      <Footer />
    </div>
  );
}