import { useState } from "react";

export default function ProyectoTareas({ tareas, setTareas }) {
  const [form, setForm] = useState({ nombre: "", asignado: "", estado: "Pendiente" });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    if (!form.nombre) {
      setMensaje("El nombre de la tarea es obligatorio");
      return;
    }
    if (editId !== null) {
      setTareas((prev) => prev.map((t) => (t.id === editId ? { ...t, ...form } : t)));
      setMensaje("Tarea actualizada");
    } else {
      setTareas((prev) => [...prev, { ...form, id: Date.now() }]);
      setMensaje("Tarea creada exitosamente");
    }
    setForm({ nombre: "", asignado: "", estado: "Pendiente" });
    setEditId(null);
  };

  const onEdit = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      setForm({ nombre: tarea.nombre, asignado: tarea.asignado, estado: tarea.estado });
      setEditId(id);
      setMensaje("");
    }
  };

  const onDelete = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
    setMensaje("Tarea eliminada");
    if (editId === id) {
      setForm({ nombre: "", asignado: "", estado: "Pendiente" });
      setEditId(null);
    }
  };

  return (
    <section className="card mt-8">
      <h2 className="text-lg font-bold mb-4">Tareas del Proyecto</h2>
      <form onSubmit={onSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label" htmlFor="nombre">Nombre de la tarea</label>
          <input id="nombre" type="text" className="input mb-2" value={form.nombre} onChange={onChange} required />
        </div>
        <div>
          <label className="label" htmlFor="asignado">Asignado a</label>
          <input id="asignado" type="text" className="input mb-2" value={form.asignado} onChange={onChange} />
        </div>
        <div>
          <label className="label" htmlFor="estado">Estado</label>
          <select id="estado" className="input mb-2" value={form.estado} onChange={onChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
          <button type="submit" className="btn btn-primary mt-2">{editId !== null ? "Actualizar" : "Crear"}</button>
          {mensaje && <p className="mt-2 text-red-600">{mensaje}</p>}
        </div>
      </form>
      <ul className="space-y-2">
        {tareas.map((t) => (
          <li key={t.id} className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center">
            <div>
              <strong>{t.nombre}</strong> <span className="text-xs text-gray-500">({t.estado})</span>
              <div className="text-sm text-gray-500">Asignado: {t.asignado || "Sin asignar"}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-secondary" onClick={() => onEdit(t.id)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(t.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {tareas.length === 0 && <p className="text-center text-gray-400 mt-6">No hay tareas</p>}
    </section>
  );
}
