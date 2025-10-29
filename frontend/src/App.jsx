import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/public/Home";              // ✅ tu landing principal
import QuienesSomos from "./pages/public/QuienesSomos";
import Servicios from "./pages/public/Servicios";
import Unete from "./pages/public/Unete";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard"; // panel del estudiante
import Proyectos from "./pages/dashboard/Proyectos";
import Tareas from "./pages/dashboard/Tareas";
import Historial from "./pages/dashboard/Historial";
import Reportes from "./pages/dashboard/Reportes";
import Documentos from "./pages/dashboard/Documentos";
import PrivateRoute from "./components/PrivateRoute"; // protege rutas internas
import UsuariosDemo from "./pages/dashboard/UsuariosDemo";
import LogsDemo from "./pages/dashboard/LogsDemo";
import EstadisticasAdmin from "./pages/dashboard/EstadisticasAdmin";
        <Route
          path="/estadisticas-admin"
          element={
            <PrivateRoute>
              <EstadisticasAdmin />
            </PrivateRoute>
          }
        />

export default function App() {
  // --- INICIO: Crear usuario admin demo en localStorage si no existe ---
  useEffect(() => {
    const demoAdmin = {
      userName: "sebastian",
      apellido: "hernandez",
      email: "juansehr1122@gmail.com",
      password: "123456789",
      rol: "Administrador"
    };
    let users = JSON.parse(localStorage.getItem("demo_users") || "[]");
    if (!users.some(u => u.email === demoAdmin.email)) {
      users.push(demoAdmin);
      localStorage.setItem("demo_users", JSON.stringify(users));
    }
  }, []);
  // --- FIN: Crear usuario admin demo ---
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🏠 Páginas públicas (visibles sin iniciar sesión) */}
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/unete" element={<Unete />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Páginas privadas (solo usuarios logueados) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/proyectos"
          element={
            <PrivateRoute>
              <Proyectos />
            </PrivateRoute>
          }
        />
        <Route
          path="/servicios"
          element={
            <PrivateRoute>
              <Servicios />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios-demo"
          element={
            <PrivateRoute>
              <UsuariosDemo />
            </PrivateRoute>
          }
        />
        <Route
          path="/logs-demo"
          element={
            <PrivateRoute>
              <LogsDemo />
            </PrivateRoute>
          }
        />
        <Route
          path="/tareas"
          element={
            <PrivateRoute>
              <Tareas />
            </PrivateRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <PrivateRoute>
              <Historial />
            </PrivateRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <PrivateRoute>
              <Reportes />
            </PrivateRoute>
          }
        />
        <Route
          path="/documentos"
          element={
            <PrivateRoute>
              <Documentos />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}
