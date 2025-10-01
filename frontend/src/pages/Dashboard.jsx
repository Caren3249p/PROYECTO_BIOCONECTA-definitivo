import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx"; // 👈 importa el Footer

const Item = ({ to, label, icon }) => (
  <Link to={to} className="group block">
    <div className="rounded-2xl border-2 border-teal-600 p-6 bg-white shadow-soft group-hover:shadow-lg transition">
      <div className="flex items-center justify-center h-20 w-20 rounded-xl bg-teal-600 mx-auto">
        <span className="text-white text-4xl">{icon}</span>
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-gray-700">
        {label}
      </p>
    </div>
  </Link>
);

export default function Dashboard() {
  const cursos = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    nombre: `CURSO ${i + 1}`,
  }));
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <div className="flex-1 max-w-6xl mx-auto px-6 py-8 bg-gray-100 w-full">
        <h1 className="text-2xl font-bold mb-6">Bienvenido</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Item to="/proyectos" label="CREAR PROYECTO" icon="+" />
          <Item to="#" label="AGENDA" icon="📅" />
          <Item to="/proyectos" label="PROYECTOS" icon="✓" />
          <Item to="/perfil" label="PERFIL" icon="👤" />
        </div>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-lg font-semibold mb-4">MIS CURSOS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {cursos.map((c, idx) => (
            <div
              key={c.id}
              className="h-28 rounded-xl shadow-soft"
              style={{
                background:
                  idx % 3 === 0 ? "#009688" : idx % 3 === 1 ? "#66D9D0" : "#222",
              }}
              title={c.nombre}
            >
              <div className="h-full w-full rounded-xl flex items-end justify-center text-white text-xs pb-2">
                {c.nombre}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 👇 Footer siempre visible abajo */}
      <Footer />
    </main>
  );
}
