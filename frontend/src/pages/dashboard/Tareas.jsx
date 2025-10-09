import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

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

  // Cargar tareas desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tareas");
    if (stored) setTareas(JSON.parse(stored));
  }, []);

  // Guardar tareas cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.descripcion) {
      setMensaje("⚠️ La descripción es obligatoria");
      return;
    }

    if (editId !== null) {
      // Editar tarea
      setTareas((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t))
      );
      setMensaje("✅ Tarea actualizada");
    } else {
      // Crear nueva tarea
      const nueva = {
        ...form,
        id: Date.now(),
        creadaEn: new Date().toLocaleString(),
      };
      setTareas((prev) => [...prev, nueva]);
      setMensaje("✅ Tarea creada exitosamente");
    }

    // Reset form
    setForm({
      descripcion: "",
      proyectoId: "",
      usuarioId: "",
      estado: "pendiente",
    });
    setEditId(null);
  };

  const onEdit = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      setForm({
        descripcion: tarea.descripcion,
        proyectoId: tarea.proyectoId,
        usuarioId: tarea.usuarioId,
        estado: tarea.estado,
      });
      setEditId(id);
      setMensaje("");
    }
  };

  const onDelete = (id) => {
    if (window.confirm("¿Eliminar esta tarea?")) {
      setTareas((prev) => prev.filter((t) => t.id !== id));
      setMensaje("🗑️ Tarea eliminada correctamente");
    }
  };

  return (
    <DashboardLayout
      title="🧩 Gestión de Tareas"
      subtitle="Crea, organiza y visualiza todas tus tareas Bioconecta"
    >
      <section className="bg-slate-900/60 p-8 rounded-2xl shadow-lg border border-teal-500/20">
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
              required
            />

            <label
              className="block text-sm text-gray-300 mt-4 mb-2"
              htmlFor="proyectoId"
            >
              ID del Proyecto
            </label>
            <input
              id="proyectoId"
              type="number"
              placeholder="Ej. 101"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.proyectoId}
              onChange={onChange}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="usuarioId">
              ID del Usuario
            </label>
            <input
              id="usuarioId"
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
                  Estado:{" "}
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
                  🧩 Proyecto ID: {t.proyectoId || "N/A"} | 👤 Usuario ID:{" "}
                  {t.usuarioId || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ⏱️ Creada: {t.creadaEn}
                </p>

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
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
