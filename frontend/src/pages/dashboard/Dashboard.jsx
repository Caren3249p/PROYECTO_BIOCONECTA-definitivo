import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre") || "Usuario";
    const storedRol = localStorage.getItem("rol") || "Estudiante";
    setNombre(storedNombre);
    setRol(storedRol);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100">
      {/* Header del Dashboard */}
      <header className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-teal-300 mb-2 drop-shadow-md">
          ¡Bienvenido, {nombre}!
        </h1>
        <p className="text-gray-300">
          Rol:{" "}
          <span className="font-semibold text-teal-400">
            {rol.charAt(0).toUpperCase() + rol.slice(1)}
          </span>
        </p>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow px-6 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              titulo: "Proyectos",
              desc: "Consulta y gestiona tus proyectos activos.",
              link: "/proyectos",
              icon: "📁",
            },
            {
              titulo: "Tareas",
              desc: "Revisa tus tareas asignadas y su progreso.",
              link: "/tareas",
              icon: "🧩",
            },
            {
              titulo: "Historial",
              desc: "Observa tus registros de participación.",
              link: "/historial",
              icon: "📜",
            },
            {
              titulo: "Reportes",
              desc: "Genera y descarga informes personalizados.",
              link: "/reportes",
              icon: "📊",
            },
          ].map((card) => (
            <Link
              key={card.titulo}
              to={card.link}
              className="group relative bg-slate-800/70 hover:bg-teal-800/60 border border-teal-500/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <span className="text-5xl">{card.icon}</span>
                <h2 className="text-2xl font-semibold text-teal-300 group-hover:text-white transition-all duration-200">
                  {card.titulo}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-teal-400/50 transition-all duration-300"></div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 bg-slate-950/70 border-t border-teal-600/20 text-center text-gray-400">
        <p className="mb-3">
          🌱 Gracias por ser parte de{" "}
          <span className="text-teal-400 font-semibold">Bioconecta</span>.
        </p>

        <div className="flex justify-center space-x-6 text-sm">
          <Link
            to="/politicas"
            className="hover:text-teal-300 transition-colors"
          >
            Política de Privacidad
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            to="/terminos"
            className="hover:text-teal-300 transition-colors"
          >
            Términos de Uso
          </Link>
          <span className="text-gray-600">|</span>
          <Link
            to="/contacto"
            className="hover:text-teal-300 transition-colors"
          >
            Contáctanos
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Bioconecta. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
