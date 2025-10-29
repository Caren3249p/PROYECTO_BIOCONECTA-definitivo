

import React, { useState, useEffect } from "react";

export default function Tareas() {
  const rol = localStorage.getItem("rol");
  // --- INICIO: Crear usuario admin demo en localStorage si no existe ---
  useEffect(() => {
    const demoAdmin = {
      userName: "sebastian",
      apellido: "hernandez",
      email: "juansehr1122@gmail.com",
      password: "123456789",
      rol: "Administrador"
    };
    let users = JSON.parse(localStorage.getItem("demo_users") || "[]");
    if (!users.some(u => u.email === demoAdmin.email)) {
      users.push(demoAdmin);
      localStorage.setItem("demo_users", JSON.stringify(users));
    }
  }, []);
  // --- FIN: Crear usuario admin demo ---
  const [tareas, setTareas] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    estado: "pendiente",
    proyectoId: "",
    usuarioId: 1,
  });
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar proyectos y tareas desde localStorage
  useEffect(() => {
    const proys = JSON.parse(localStorage.getItem("demo_proyectos") || "[]");
    setProyectos(proys);
    const ts = JSON.parse(localStorage.getItem("demo_tareas") || "[]");
    setTareas(ts);
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMensaje("");
    let nuevasTareas = JSON.parse(localStorage.getItem("demo_tareas") || "[]");
    if (editId) {
      nuevasTareas = nuevasTareas.map(t => t.id === editId ? { ...form, id: editId, creadaEn: t.creadaEn } : t);
      setMensaje("✅ Tarea actualizada correctamente");
      setEditId(null);
    } else {
      const nueva = {
        ...form,
        id: Date.now(),
        creadaEn: new Date().toLocaleString(),
      };
      nuevasTareas.push(nueva);
      setMensaje("✅ Tarea creada correctamente");
    }
    localStorage.setItem("demo_tareas", JSON.stringify(nuevasTareas));
    setTareas(nuevasTareas);
    setForm({ descripcion: "", estado: "pendiente", proyectoId: "", usuarioId: 1 });
    setTimeout(() => setMensaje(""), 3000);
  };

  const onEdit = (id) => {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
      setForm({
        descripcion: tarea.descripcion,
        estado: tarea.estado,
        proyectoId: tarea.proyectoId,
        usuarioId: tarea.usuarioId,
      });
      setEditId(id);
    }
  };

  const onDelete = (id) => {
    const nuevasTareas = tareas.filter(t => t.id !== id);
    localStorage.setItem("demo_tareas", JSON.stringify(nuevasTareas));
    setTareas(nuevasTareas);
    setMensaje("Tarea eliminada");
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100">
      <section className="bg-slate-900/60 p-8 rounded-2xl shadow-lg border border-teal-500/20 max-w-4xl mx-auto mt-10">
        {/* FORMULARIO */}
        <h2 className="text-2xl font-bold text-teal-300 mb-6 text-center">
          {editId ? "Editar Tarea" : "Crear Nueva Tarea"}
        </h2>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <input
              id="descripcion"
              type="text"
              placeholder="Ej. Revisar módulo de usuarios"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.descripcion}
              onChange={onChange}
              name="descripcion"
              required
            />

            <label
              className="block text-sm text-gray-300 mt-4 mb-2"
              htmlFor="proyectoId"
            >
              Proyecto
            </label>
            <select
              id="proyectoId"
              name="proyectoId"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.proyectoId}
              onChange={onChange}
              required
            >
              <option value="">Seleccione un proyecto</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>{p.descripcion}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="usuarioId">
              ID del Usuario
            </label>
            <input
              id="usuarioId"
              name="usuarioId"
              type="number"
              placeholder="Ej. 12"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.usuarioId}
              onChange={onChange}
            />

            <label className="block text-sm text-gray-300 mt-4 mb-2" htmlFor="estado">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.estado}
              onChange={onChange}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-teal-500/30"
            >
              {editId ? "Actualizar Tarea" : "Crear Tarea"}
            </button>

            {mensaje && (
              <p className="mt-4 text-center text-teal-400 font-medium">
                {mensaje}
              </p>
            )}
          </div>
        </form>

        {/* HISTORIAL DE TAREAS */}
        <h3 className="text-xl font-bold text-teal-300 mb-4 border-b border-teal-500/30 pb-2">
          📋 Historial de Tareas Creadas
        </h3>

        {tareas.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            💤 No hay tareas registradas aún.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tareas.map((t) => (
              <div
                key={t.id}
                className="bg-gray-800/50 border border-teal-500/20 rounded-xl p-5 shadow-md hover:shadow-teal-500/20 transition-all"
              >
                <h4 className="text-lg font-semibold text-teal-300">
                  {t.descripcion}
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  Estado: {" "}
                  <span
                    className={`${
                      t.estado === "completada"
                        ? "text-green-400"
                        : t.estado === "en progreso"
                        ? "text-yellow-300"
                        : "text-red-400"
                    } font-semibold`}
                  >
                    {t.estado}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  🧩 Proyecto: {proyectos.find(p => p.id == t.proyectoId)?.descripcion || t.proyectoId || "N/A"} | 👤 Usuario ID: {t.usuarioId || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ⏱️ Creada: {t.creadaEn}
                </p>

                {rol === "Administrador" && (
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => onEdit(t.id)}
                      className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-lg text-sm hover:bg-yellow-500/30"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-sm hover:bg-red-500/30"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
