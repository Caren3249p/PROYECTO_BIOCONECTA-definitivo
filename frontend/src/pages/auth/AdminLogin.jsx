import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../servicios/login";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // Credenciales de prueba (ajusta según tu BD)
  const adminCred = {
    email: process.env.REACT_APP_ADMIN_EMAIL || "admin@bioconecta.test",
    password: process.env.REACT_APP_ADMIN_PASSWORD || "admin123",
  };

  const handleQuickLogin = async () => {
    setMensaje("");
    setLoading(true);
    try {
      const result = await login(adminCred.email, adminCred.password);
      if (result.ok) {
        // store token & basic user info (login service también lo guarda)
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("rol", result.user?.rol || "Admin");
        localStorage.setItem("nombre", result.user?.userName || "Admin");

        setMensaje("✅ Login de admin exitoso");
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        setMensaje(`❌ ${result.message || 'Error en login'}`);
      }
    } catch (err) {
      setMensaje(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/5 p-6 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Login rápido de Admin</h2>

        <p className="text-sm text-gray-300 mb-4">Inicia sesión con credenciales de prueba.</p>

        {mensaje && (
          <div className="mb-3 text-sm">
            {mensaje}
          </div>
        )}

        <div className="space-x-2">
          <button
            onClick={handleQuickLogin}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Ingresando..." : "Entrar como admin (prueba)"}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-400">Credenciales usadas: <strong>{adminCred.email}</strong> / <strong>{adminCred.password}</strong></div>
      </div>
    </div>
  );
}
