import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Perfil from "./pages/Perfil.jsx";
import Proyectos from "./pages/Proyectos.jsx";
import QuienesSomos from "./pages/quienessomos.jsx";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Unete from "./pages/Unete";
import Servicios from "./pages/Servicios";
import Tareas from "./pages/Tareas.jsx";
import Reportes from "./pages/Reportes.jsx";
import Logs from "./pages/Logs.jsx";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad.jsx";
import TerminosUso from "./pages/TerminosUso.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/unete" element={<Unete />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-uso" element={<TerminosUso />} />
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-gray-300 mb-8">Página no encontrada</p>
                <Navigate to="/" />
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

