import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../servicios/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    const result = await login(email, password);

    if (result.ok) {
      setMensaje("✅ Inicio de sesión exitoso");

      // Guarda el token y datos del usuario
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("rol", result.user?.rol || "Usuario");
      localStorage.setItem("nombre", result.user?.userName || "Usuario");

      // Redirigir después de un breve delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setMensaje(`❌ ${result.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 px-4 py-12">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-teal-500/30 rounded-2xl shadow-2xl p-8 w-full max-w-md text-gray-100">
        {/* Logo y encabezado */}
        <div className="text-center mb-8">
          <img
            src="/Logo.png"
            alt="Bioconecta"
            className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-teal-300">
            Inicia sesión
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Conecta con tu cuenta Bioconecta 🌱
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Mensaje de estado */}
          {mensaje && (
            <div
              className={`text-center py-2 px-4 rounded-lg text-sm font-medium ${
                mensaje.startsWith("✅")
                  ? "bg-green-500/20 text-green-400 border border-green-400/30"
                  : "bg-red-500/20 text-red-400 border border-red-400/30"
              }`}
            >
              {mensaje}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-teal-500/30 disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Enlaces extra */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-teal-400 hover:text-teal-300 font-medium transition-all"
          >
            Regístrate aquí
          </Link>
        </div>

        {/* Políticas */}
        <div className="mt-6 text-center text-xs text-gray-500 space-x-2">
          <Link to="/politicas" className="hover:text-teal-300">
            Política de Privacidad
          </Link>
          <span>•</span>
          <Link to="/terminos" className="hover:text-teal-300">
            Términos de Uso
          </Link>
          <span>•</span>
          <Link to="/contacto" className="hover:text-teal-300">
            Contáctanos
          </Link>
        </div>

        <p className="mt-4 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} Bioconecta — Ciencia e Innovación
        </p>
      </div>
    </div>
  );
}
