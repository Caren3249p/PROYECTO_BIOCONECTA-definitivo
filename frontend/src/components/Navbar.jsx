import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [rol, setRol] = useState(null);

  // 🔍 Comprobar si hay sesión real
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRol = localStorage.getItem("rol");

    // Valida que el token exista y no sea una cadena vacía
    if (token && token !== "undefined" && token !== "null") {
      setIsLogged(true);
      setRol(storedRol);
    } else {
      setIsLogged(false);
      setRol(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    // Solo borra datos de sesión, no los datos demo
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    setIsLogged(false);
    setRol(null);
    navigate("/"); // regresa a la página de inicio
  };

  const publicLinks = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "¿Quiénes Somos?" },
    { href: "/unete", label: "Únete a Bioconecta" },
    { href: "/servicios", label: "Servicios" },
  ];

  let privateLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/tareas", label: "Tareas" },
    { href: "/historial", label: "Historial" },
    { href: "/reportes", label: "Reportes" },
  ];
  // Si es admin, agrega enlaces exclusivos
  if (rol === "Administrador") {
    privateLinks.push({ href: "/usuarios-demo", label: "Usuarios" });
    // Logs y Estadísticas removidos del menú admin
  }

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-teal-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 🔹 Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/Logo.png" alt="Bioconecta" className="h-10" />
            <span className="text-xl font-bold text-white hidden sm:block">Bioconecta</span>
          </Link>

          {/* 🔹 Navegación */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-6">
              {(isLogged ? privateLinks : publicLinks).map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={`text-gray-300 hover:text-teal-400 transition font-medium ${
                      pathname === link.href ? "text-teal-400 border-b-2 border-teal-400" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 🔹 Botones */}
          <div className="flex items-center space-x-4">
            {!isLogged ? (
              <>
                <Link
                  to="/login"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-semibold px-4 py-2 rounded-lg"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                {rol && (
                  <span className="text-teal-400 text-sm font-semibold bg-teal-400/10 px-3 py-1 rounded-full capitalize">
                    {rol}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
