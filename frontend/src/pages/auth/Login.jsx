import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../../servicios/login";
import { useState } from "react";
import React from "react";


export default function Login() {
  const [form, setForm] = useState({ email: "", pass: "" });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
    
    try {
      const { ok, access_token, user, message } = await loginApi(form.email, form.pass);
      
      if (ok && access_token) {
        localStorage.setItem("token", access_token);
        localStorage.setItem("rol", (user?.rol) || "Usuario");
        setMensaje("¡Login exitoso! Redirigiendo...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMensaje(message || "Credenciales incorrectas");
      }
    } catch {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const loginPrueba = (rol) => {
    localStorage.setItem("token", "token-falso-prueba");
    localStorage.setItem("rol", rol);
    setMensaje(`Login de prueba como ${rol}. Redirigiendo...`);
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/Logo.png" alt="Bioconecta" className="mx-auto h-16 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h2>
          <p className="text-gray-400">Ingresa a tu cuenta de Bioconecta</p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input 
                id="email" 
                type="email" 
                placeholder="tu@email.com" 
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200" 
                required 
                value={form.email} 
                onChange={onChange} 
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input 
                id="pass" 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-200" 
                required 
                value={form.pass} 
                onChange={onChange} 
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-600 text-teal-600 focus:ring-teal-500" />
                <span className="ml-2 text-sm text-gray-400">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>

            <div className="text-center">
              <span className="text-gray-400">¿No tienes cuenta? </span>
              <Link to="/register" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
                Regístrate aquí
              </Link>
            </div>
          </form>


          {mensaje && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
              mensaje.includes("exitoso") || mensaje.includes("prueba") 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}>
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
