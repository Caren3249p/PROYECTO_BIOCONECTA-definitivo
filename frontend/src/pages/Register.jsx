import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    email2: "",
    pass: "",
    pass2: "",
    fecha: "",
    tel: "",
    rol: "Estudiante",
  });
  const [mensaje, setMensaje] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    if (form.email !== form.email2) {
      setMensaje("Los correos no coinciden");
      return;
    }
    if (form.pass !== form.pass2) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }
    // Guardar usuario en localStorage (simulación)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (usuarios.find(u => u.email === form.email)) {
      setMensaje("El correo ya está registrado");
      return;
    }
    const nuevoUsuario = {
      email: form.email,
      password: form.pass,
      fechaNacimiento: form.fecha,
      telefono: form.tel,
      rol: form.rol,
    };
    localStorage.setItem("usuarios", JSON.stringify([...usuarios, nuevoUsuario]));
    // Simular login: guardar token y rol
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("rol", form.rol);
    setMensaje("Cuenta creada exitosamente. Redirigiendo...");
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <main className="flex-1 flex items-start justify-center py-14">
      <form onSubmit={onSubmit} className="card w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-center md:text-left">Registrarse</h2>
            <p className="text-center md:text-left text-gray-500 mb-4">¿Ya tienes cuenta?</p>

            <label className="label" htmlFor="email">Correo Electrónico</label>
            <input id="email" type="email" placeholder="Correo Electrónico" className="input mb-3" required value={form.email} onChange={onChange} />

            <label className="label" htmlFor="email2">Confirmar correo Electrónico</label>
            <input id="email2" type="email" placeholder="Confirmar correo Electrónico" className="input mb-3" required value={form.email2} onChange={onChange} />

            <label className="label" htmlFor="pass">Contraseña</label>
            <input id="pass" type="password" placeholder="Contraseña" className="input mb-3" required value={form.pass} onChange={onChange} />

            <label className="label" htmlFor="pass2">Confirmar Contraseña</label>
            <input id="pass2" type="password" placeholder="Confirmar contraseña" className="input mb-3" required value={form.pass2} onChange={onChange} />
          </div>

          <div>
            <label className="label" htmlFor="fecha">Fecha de Nacimiento</label>
            <input id="fecha" type="date" className="input mb-3" required value={form.fecha} onChange={onChange} />

            <label className="label" htmlFor="tel">Teléfono</label>
            <input id="tel" type="tel" placeholder="+57 300 000 0000" className="input mb-3" required value={form.tel} onChange={onChange} />

            <label className="label" htmlFor="rol">Seleccione un Rol</label>
            <select id="rol" className="input mb-3" value={form.rol} onChange={onChange}>
              <option>Estudiante</option>
              <option>Asesor</option>
              <option>Administrador</option>
            </select>

            <div className="mt-10 md:mt-16 flex items-center justify-center md:justify-start">
              <button type="submit" className="btn btn-primary">Crear cuenta</button>
              <Link to="/login" className="ml-4 text-teal-600 hover:underline">Iniciar Sesión</Link>
            </div>
            {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
          </div>
        </div>
      </form>
    </main>
  );
}
