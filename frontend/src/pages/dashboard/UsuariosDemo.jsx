import React, { useEffect, useState } from "react";

export default function UsuariosDemo() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    userName: "",
    apellido: "",
    email: "",
    password: "",
    rol: "Estudiante"
  });
  const [editIndex, setEditIndex] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("demo_users") || "[]");
    setUsuarios(users);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("demo_users") || "[]");
    if (editIndex !== null) {
      users[editIndex] = { ...form };
      setMensaje("Usuario actualizado");
    } else {
      if (users.some(u => u.email === form.email)) {
        setMensaje("El correo ya existe");
        return;
      }
      users.push({ ...form });
      setMensaje("Usuario creado");
    }
    localStorage.setItem("demo_users", JSON.stringify(users));
    setUsuarios(users);
    setForm({ userName: "", apellido: "", email: "", password: "", rol: "Estudiante" });
    setEditIndex(null);
    setTimeout(() => setMensaje(""), 2000);
  };

  const handleEdit = idx => {
    setForm({ ...usuarios[idx] });
    setEditIndex(idx);
  };

  const handleDelete = idx => {
    const adminEmail = "juansehr1122@gmail.com";
    if (usuarios[idx].email === adminEmail) {
      setMensaje("No puedes eliminar el usuario admin demo");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }
    let users = [...usuarios];
    users.splice(idx, 1);
    localStorage.setItem("demo_users", JSON.stringify(users));
    setUsuarios(users);
  setMensaje("Usuario eliminado");
  setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      {mensaje && <div className="mb-2 text-green-400">{mensaje}</div>}
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-4">
        <input name="userName" value={form.userName} onChange={handleChange} placeholder="Nombre" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" className="p-2 rounded bg-gray-800 text-white" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" type="email" className="p-2 rounded bg-gray-800 text-white col-span-2" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Contraseña" type="password" className="p-2 rounded bg-gray-800 text-white col-span-2" required />
        <select name="rol" value={form.rol} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white col-span-2">
          <option value="Estudiante">Estudiante</option>
          <option value="Gestor">Gestor</option>
          <option value="Administrador">Administrador</option>
        </select>
        <button type="submit" className="col-span-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded">
          {editIndex !== null ? "Actualizar" : "Crear"} Usuario
        </button>
      </form>
      <table className="w-full text-left bg-slate-900 rounded">
        <thead>
          <tr className="text-teal-400">
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Rol</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, idx) => (
            <tr key={u.email} className="border-b border-slate-700">
              <td className="p-2">{u.userName}</td>
              <td className="p-2">{u.apellido}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.rol}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(idx)} className="text-blue-400 hover:underline mr-2">Editar</button>
                {u.email !== "juansehr1122@gmail.com" && (
                  <button onClick={() => handleDelete(idx)} className="text-red-400 hover:underline">Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
