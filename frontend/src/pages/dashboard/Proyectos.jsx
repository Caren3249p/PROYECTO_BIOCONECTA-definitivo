
import React, { useState, useEffect } from "react";

export default function Proyectos() {
  const rol = localStorage.getItem("rol");
  const [servicios, setServicios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    cost: "",
    servicio: "",
    fechaInicio: "",
    fechaFinEsperada: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [editId, setEditId] = useState(null);

  // Cargar servicios demo y proyectos guardados
  useEffect(() => {
    setServicios([
      "Consultoría Biotecnológica",
      "Investigación y Desarrollo",
      "Capacitación",
      "Sostenibilidad"
    ]);
    const guardados = JSON.parse(localStorage.getItem("demo_proyectos") || "[]");
    setProyectos(guardados);
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let nuevosProyectos = JSON.parse(localStorage.getItem("demo_proyectos") || "[]");
    let nuevoProyecto = null;
    if (editId) {
      nuevosProyectos = nuevosProyectos.map(p => p.id === editId ? { ...form, id: editId } : p);
      setMensaje("Proyecto actualizado con éxito 🎉");
      setTipoMensaje("success");
      setEditId(null);
    } else {
      nuevoProyecto = { ...form, id: Date.now() };
      nuevosProyectos.push(nuevoProyecto);
      setMensaje("Proyecto creado con éxito 🎉");
      setTipoMensaje("success");
      // Agregar al historial demo
      let historial = JSON.parse(localStorage.getItem("demo_historial") || "[]");
      historial.unshift({
        id: Date.now(),
        tipoParticipacion: "proyecto_asignado",
        descripcion: `Proyecto creado: ${form.descripcion}`,
        fechaEvento: new Date().toISOString().slice(0,10),
      });
      localStorage.setItem("demo_historial", JSON.stringify(historial));
    }
    localStorage.setItem("demo_proyectos", JSON.stringify(nuevosProyectos));
    setProyectos(nuevosProyectos);
    setForm({
      descripcion: "",
      cost: "",
      servicio: "",
      fechaInicio: "",
      fechaFinEsperada: "",
    });
    setTimeout(() => setMensaje(null), 4000);
  };

  const onEdit = (id) => {
    const proyecto = proyectos.find(p => p.id === id);
    if (proyecto) {
      setForm({
        descripcion: proyecto.descripcion,
        cost: proyecto.cost,
        servicio: proyecto.servicio,
        fechaInicio: proyecto.fechaInicio,
        fechaFinEsperada: proyecto.fechaFinEsperada,
      });
      setEditId(id);
    }
  };

  const onDelete = (id) => {
    const nuevosProyectos = proyectos.filter(p => p.id !== id);
    localStorage.setItem("demo_proyectos", JSON.stringify(nuevosProyectos));
    setProyectos(nuevosProyectos);
    setMensaje("Proyecto eliminado");
    setTipoMensaje("success");
    setTimeout(() => setMensaje(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100">
      {/* 🔔 Notificación animada tipo “toast” */}
      {mensaje && (
        <div
          className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ease-in-out ${
            tipoMensaje === "success"
              ? "bg-teal-600 border border-teal-400 shadow-teal-500/40"
              : "bg-red-600 border border-red-400 shadow-red-500/40"
          } px-6 py-3 rounded-xl shadow-lg text-white font-semibold animate-fadeIn`}
          style={{
            animation:
              "slideDown 0.4s ease-out, fadeOut 0.4s ease-in 3.6s forwards",
          }}
        >
          {mensaje}
        </div>
      )}

      {/* 🎨 Animaciones suaves para la notificación */}
      <style>
        {`
          @keyframes slideDown {
            from {
              transform: translateY(-25px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeOut {
            to {
              opacity: 0;
              transform: translateY(-15px);
            }
          }
        `}
      </style>

      {/* Encabezado */}
      <header className="py-10 text-center">
        <h1 className="text-4xl font-extrabold text-teal-300 drop-shadow-md">
          🧬 Crear Proyecto
        </h1>
        <p className="text-gray-400 mt-2">
          Registra un nuevo proyecto con su información básica.
        </p>
      </header>

      {/* Contenedor principal */}
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto w-full">
        <form
          onSubmit={onSubmit}
          className="bg-slate-800/70 border border-teal-500/20 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold text-teal-300">
                Descripción:
              </label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-teal-600/30 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                rows="3"
                placeholder="Describe el proyecto..."
              />
            </div>

            {/* Costo */}
            <div>
              <label className="block mb-2 font-semibold text-teal-300">
                Costo:
              </label>
              <input
                type="number"
                name="cost"
                value={form.cost}
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-teal-600/30 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder="Ejemplo: 1200000"
              />
            </div>

            {/* Servicio */}
            <div>
              <label className="block mb-2 font-semibold text-teal-300">
                Servicio:
              </label>
              <select
                name="servicio"
                value={form.servicio}
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-teal-600/30 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map((nombre, index) => (
                  <option key={index} value={nombre}>
                    {nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Fechas */}
            <div>
              <label className="block mb-2 font-semibold text-teal-300">
                Fecha de Inicio:
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={form.fechaInicio}
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-teal-600/30 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-teal-300">
                Fecha Estimada de Fin:
              </label>
              <input
                type="date"
                name="fechaFinEsperada"
                value={form.fechaFinEsperada}
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-slate-900/60 border border-teal-600/30 text-gray-100 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Botón */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-teal-400/40 transition-all duration-300"
            >
              {editId ? "Actualizar Proyecto" : "Guardar Proyecto"}
            </button>
            {editId && (
              <button
                type="button"
                className="ml-4 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
                onClick={() => {
                  setEditId(null);
                  setForm({ descripcion: "", cost: "", servicio: "", fechaInicio: "", fechaFinEsperada: "" });
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Listado de proyectos */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-teal-300 mb-6 text-center">📋 Proyectos Registrados</h2>
          {proyectos.length === 0 ? (
            <p className="text-gray-400 text-center py-6">No hay proyectos registrados aún.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {proyectos.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-800/50 border border-teal-500/20 rounded-xl p-5 shadow-md hover:shadow-teal-500/20 transition-all"
                >
                  <h4 className="text-lg font-semibold text-teal-300">{p.descripcion}</h4>
                  <p className="text-gray-400 text-sm mt-1">Servicio: <span className="text-teal-400">{p.servicio}</span></p>
                  <p className="text-gray-400 text-sm">Costo: <span className="text-teal-300">${p.cost}</span></p>
                  <p className="text-xs text-gray-500 mt-2">Inicio: {p.fechaInicio || "-"} | Fin estimada: {p.fechaFinEsperada || "-"}</p>
                  {rol === "Administrador" && (
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
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950/70 border-t border-teal-600/20 text-center text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} Bioconecta — Innovación y Tecnología Verde 🌱
        </p>
      </footer>
    </div>
  );
}
