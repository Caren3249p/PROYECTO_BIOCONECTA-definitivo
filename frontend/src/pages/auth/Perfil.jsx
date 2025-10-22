import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="flex-1 flex items-start justify-center py-10">
      <form className="card w-full max-w-5xl">
        <h1 className="text-xl font-bold mb-6">PERFIL</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white">👤</span>
              </div>
              <span className="text-gray-500 text-sm">Usuario</span>
            </div>

            <label className="label">Correo Electrónico</label>
            <input type="email" placeholder="******@***.com" className="input mb-3" />

            <label className="label">Contraseña</label>
            <input type="password" value="********" className="input mb-3" readOnly />
          </div>

          <div>
            <label className="label">Fecha de Nacimiento</label>
            <input type="date" className="input mb-3" />

            <label className="label">Teléfono</label>
            <input type="tel" className="input mb-3" placeholder="+57 **********" />

            <label className="label">Seleccione un Rol</label>
            <select className="input mb-3">
              <option>Estudiante</option>
              <option>Asesor</option>
              <option>Administrador</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="button" className="btn btn-primary w-40">Editar</button>
        </div>
      </form>
    </main>
  );
}
