import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../../servicios/register";
import React from "react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    userLastname: "",
    email: "",
    password: "",
    userRole_iduserRole: 1, // 1 = Estudiante por defecto
    userStatus_iduserStatus: 1, // 1 = Activo
    company_idcompany: 1, // Puedes cambiarlo según tu DB
  });

  const [mensaje, setMensaje] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const { ok, message } = await registerApi(form);
      if (ok) {
        setMensaje("Cuenta creada exitosamente. Redirigiendo...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMensaje(message || "Error al registrar el usuario");
      }
    } catch (err) {
      setMensaje(err.message || "Error de conexión con el servidor");
    }
  };

  return (
    <main className="flex-1 flex items-start justify-center py-14">
      <form onSubmit={onSubmit} className="card w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Crear cuenta</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="userName" type="text" placeholder="Nombre" className="input" onChange={onChange} required />
          <input name="userLastname" type="text" placeholder="Apellido" className="input" onChange={onChange} required />
          <input name="email" type="email" placeholder="Correo Electrónico" className="input" onChange={onChange} required />
          <input name="password" type="password" placeholder="Contraseña" className="input" onChange={onChange} required />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button type="submit" className="btn btn-primary">Registrarse</button>
          <Link to="/login" className="text-teal-400 hover:underline">Iniciar sesión</Link>
        </div>

        {mensaje && <p className="mt-4 text-center text-teal-400">{mensaje}</p>}
      </form>
    </main>
  );
}
