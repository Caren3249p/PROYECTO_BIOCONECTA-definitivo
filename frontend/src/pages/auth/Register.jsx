import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../../servicios/register";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    userLastname: "",
    email: "",
    password: "",
    userRole_iduserRole: 1,     // 1 = Estudiante (por defecto)
    userStatus_iduserStatus: 1, // 1 = Activo
    company_idcompany: 2        // ID válido en tu tabla company
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      console.log("📤 Enviando datos:", form);
      const { ok, message } = await registerApi(form);

      if (ok) {
        setMensaje("✅ Cuenta creada exitosamente. Redirigiendo...");
        setTimeout(() => navigate("/login"), 1800);
      } else {
        setMensaje(message || "⚠️ Error al registrar el usuario.");
      }
    } catch (err) {
      console.error("❌ Error al registrar:", err);
      setMensaje("❌ No se pudo conectar con el servidor. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex items-center justify-center py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={onSubmit}
        className="card w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-teal-400">
          Crear cuenta Bioconecta 🌱
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="userName"
            type="text"
            placeholder="Nombre"
            className="input bg-gray-700 text-white placeholder-gray-400 border-none rounded-xl p-3"
            onChange={onChange}
            required
          />
          <input
            name="userLastname"
            type="text"
            placeholder="Apellido"
            className="input bg-gray-700 text-white placeholder-gray-400 border-none rounded-xl p-3"
            onChange={onChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            className="input bg-gray-700 text-white placeholder-gray-400 border-none rounded-xl p-3"
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="input bg-gray-700 text-white placeholder-gray-400 border-none rounded-xl p-3"
            onChange={onChange}
            required
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl shadow-md transition-all"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <Link
            to="/login"
            className="text-teal-400 hover:underline transition-all"
          >
            Iniciar sesión
          </Link>
        </div>

        {mensaje && (
          <p
            className={`mt-6 text-center ${
              mensaje.includes("✅")
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {mensaje}
          </p>
        )}
      </form>
    </main>
  );
}
