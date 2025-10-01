import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [rol, setRol] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/quienes-somos", label: "¿Quiénes Somos?" },
    { href: "/unete", label: "Únete a Bioconecta" },
    { href: "/servicios", label: "Servicios" },
  ];

  const loggedLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/tareas", label: "Tareas" },
    { href: "/historial", label: "Historial" },
    { href: "/reportes", label: "Reportes" },
  ];

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
    setRol(localStorage.getItem("rol"));
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-teal-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/Logo.png" alt="Bioconecta" className="h-10 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold text-white hidden sm:block">Bioconecta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    className={`text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium ${
                      pathname === link.href ? "text-teal-400 border-b-2 border-teal-400" : ""
                    }`}
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              
              {isLogged && loggedLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className={`text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium ${
                      pathname === link.href ? "text-teal-400 border-b-2 border-teal-400" : ""
                    }`}
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {rol && (
              <span className="hidden sm:block text-teal-400 font-semibold text-sm bg-teal-400/10 px-3 py-1 rounded-full">
                {rol}
              </span>
            )}

            {!isLogged ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/perfil"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-teal-600/20 hover:bg-teal-600/30 transition-colors duration-200 border border-teal-400/20"
                  title="Mi Perfil"
                >
                  <img src="/user-icon.svg" alt="perfil" className="h-5 w-5 invert" />
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Salir
                </button>
              </div>
            )}

            {/* Admin Controls */}
            {isLogged && rol === "Administrador" && (
              <Link
                to="/logs"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
              >
                Admin
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === link.href 
                      ? "text-teal-400 bg-teal-400/10" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isLogged && loggedLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === link.href 
                      ? "text-teal-400 bg-teal-400/10" 
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
