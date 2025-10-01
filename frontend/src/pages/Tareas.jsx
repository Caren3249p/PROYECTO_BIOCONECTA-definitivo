import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tareas() {
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    proyectoId: "",
    usuarioId: "",
    estado: "pendiente",
  });
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetch("http://localhost:3000/tareas", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setTareas(data));
    }
  }, [navigate]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    const token = localStorage.getItem("token");
    try {
      const url = editId ? `http://localhost:3000/tareas/${editId}` : "http://localhost:3000/tareas";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje(editId ? "Tarea actualizada" : "Tarea creada");
        setForm({ descripcion: "", proyectoId: "", usuarioId: "", estado: "pendiente" });
        setEditId(null);
        fetch("http://localhost:3000/tareas", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setTareas(data));
      } else {
        setMensaje(data.message || "Error al guardar tarea");
      }
    } catch {
      setMensaje("Error de conexión");
    }
  };

  const onEdit = (t) => {
    setForm({
      descripcion: t.descripcion,
      proyectoId: t.proyecto?.id || "",
      usuarioId: t.usuario?.id || "",
      estado: t.estado || "pendiente",
    });
    setEditId(t.id);
  };

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("¿Eliminar tarea?")) {
      await fetch(`http://localhost:3000/tareas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTareas((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <main className="flex-1 flex items-start justify-center py-10">
      <section className="card w-full max-w-5xl">
        <h1 className="text-xl font-bold mb-6">TAREAS</h1>
        <div className="border-b-4 border-teal-600 w-32 mb-6"></div>
        <form onSubmit={onSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label" htmlFor="descripcion">Descripción</label>
            <input id="descripcion" type="text" className="input mb-3" required value={form.descripcion} onChange={onChange} />
            <label className="label" htmlFor="proyectoId">ID Proyecto</label>
            <input id="proyectoId" type="number" className="input mb-3" required value={form.proyectoId} onChange={onChange} />
          </div>
          <div>
            <label className="label" htmlFor="usuarioId">ID Usuario</label>
            <input id="usuarioId" type="number" className="input mb-3" required value={form.usuarioId} onChange={onChange} />
            <label className="label" htmlFor="estado">Estado</label>
            <select id="estado" className="input mb-3" value={form.estado} onChange={onChange}>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
            <button type="submit" className="btn btn-primary mt-6">{editId ? "Actualizar" : "Crear"} Tarea</button>
            {mensaje && <p className="mt-4 text-red-600">{mensaje}</p>}
          </div>
        </form>
        <ul className="space-y-3">
          {tareas.map((t) => (
            <li key={t.id} className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700 flex justify-between items-center">
              <div>
                <strong>{t.descripcion}</strong> <span className="text-xs text-gray-500">[{t.estado}]</span>
                <div className="text-sm text-gray-500">Proyecto: {t.proyecto?.nombre || t.proyectoId} | Usuario: {t.usuario?.email || t.usuarioId}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary" onClick={() => onEdit(t)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(t.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
        {tareas.length === 0 && <p className="text-center text-gray-400 mt-10">No hay tareas</p>}
      </section>
    </main>
  );
}
