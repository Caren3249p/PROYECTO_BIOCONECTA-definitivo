import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

export default function Proyectos() {
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar desde localStorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("proyectos");
    if (stored) setProyectos(JSON.parse(stored));
  }, []);

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre) {
      setMensaje("⚠️ El nombre del proyecto es obligatorio");
      return;
    }

    if (editId !== null) {
      // Editar
      setProyectos((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, ...form } : p))
      );
      setMensaje("✅ Proyecto actualizado");
    } else {
      // Crear nuevo
      const nuevo = {
        ...form,
        id: Date.now(),
        creadoEn: new Date().toLocaleString(),
      };
      setProyectos((prev) => [...prev, nuevo]);
      setMensaje("✅ Proyecto creado exitosamente");
    }

    // Reset form
    setForm({ nombre: "", descripcion: "", fechaInicio: "", fechaFin: "" });
    setEditId(null);
  };

  const onEdit = (id) => {
    const proyecto = proyectos.find((p) => p.id === id);
    if (proyecto) {
      setForm({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio,
        fechaFin: proyecto.fechaFin,
      });
      setEditId(id);
      setMensaje("");
    }
  };

  const onDelete = (id) => {
    if (window.confirm("¿Eliminar este proyecto?")) {
      setProyectos((prev) => prev.filter((p) => p.id !== id));
      setMensaje("🗑️ Proyecto eliminado correctamente");
    }
  };

  return (
    <DashboardLayout
      title="📁 Gestión de Proyectos"
      subtitle="Crea, organiza y visualiza todos tus proyectos Bioconecta"
    >
      <section className="bg-slate-900/60 p-8 rounded-2xl shadow-lg border border-teal-500/20">
        {/* FORMULARIO */}
        <h2 className="text-2xl font-bold text-teal-300 mb-6 text-center">
          {editId ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
        </h2>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-2" htmlFor="nombre">
              Nombre del Proyecto
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ej. Sistema de energía renovable"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.nombre}
              onChange={onChange}
              required
            />

            <label
              className="block text-sm text-gray-300 mt-4 mb-2"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              placeholder="Describe brevemente el objetivo del proyecto..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="3"
              value={form.descripcion}
              onChange={onChange}
            ></textarea>
          </div>

          <div>
            <label
              className="block text-sm text-gray-300 mb-2"
              htmlFor="fechaInicio"
            >
              Fecha de Inicio
            </label>
            <input
              id="fechaInicio"
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.fechaInicio}
              onChange={onChange}
            />

            <label
              className="block text-sm text-gray-300 mt-4 mb-2"
              htmlFor="fechaFin"
            >
              Fecha de Fin
            </label>
            <input
              id="fechaFin"
              type="date"
              className="w-full px-4 py-2 rounded-lg bg-gray-800/60 border border-teal-500/30 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={form.fechaFin}
              onChange={onChange}
            />

            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-teal-500/30"
            >
              {editId ? "Actualizar Proyecto" : "Crear Proyecto"}
            </button>

            {mensaje && (
              <p className="mt-4 text-center text-teal-400 font-medium">
                {mensaje}
              </p>
            )}
          </div>
        </form>

        {/* HISTORIAL DE PROYECTOS */}
        <h3 className="text-xl font-bold text-teal-300 mb-4 border-b border-teal-500/30 pb-2">
          🧾 Historial de Proyectos Creados
        </h3>

        {proyectos.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            📂 Aún no has creado ningún proyecto.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {proyectos.map((p) => (
              <div
                key={p.id}
                className="bg-gray-800/50 border border-teal-500/20 rounded-xl p-5 shadow-md hover:shadow-teal-500/20 transition-all"
              >
                <h4 className="text-lg font-semibold text-teal-300">
                  {p.nombre}
                </h4>
                <p className="text-gray-400 text-sm mt-1">{p.descripcion}</p>
                <p className="text-xs text-gray-500 mt-2">
                  📅 Inicio: {p.fechaInicio || "N/A"} | Fin:{" "}
                  {p.fechaFin || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ⏱️ Creado: {p.creadoEn}
                </p>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => onEdit(p.id)}
                    className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-lg text-sm hover:bg-yellow-500/30"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
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
