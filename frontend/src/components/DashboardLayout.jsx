import React from "react";
import { Link } from "react-router-dom";

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100">
      {/* Encabezado */}
      <header className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-teal-300 mb-2 drop-shadow-md">{title}</h1>
        <p className="text-gray-300">{subtitle}</p>
      </header>

      {/* Contenido dinámico */}
      <main className="flex-grow max-w-6xl mx-auto p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 bg-slate-950/70 border-t border-teal-600/20 text-center text-gray-400">
        <p className="mb-3">
          🌱 Parte de <span className="text-teal-400 font-semibold">Bioconecta</span>
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <Link to="/politicas" className="hover:text-teal-300 transition-colors">
            Política de Privacidad
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/terminos" className="hover:text-teal-300 transition-colors">
            Términos de Uso
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/contacto" className="hover:text-teal-300 transition-colors">
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
