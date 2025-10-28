import React, { useState, useEffect } from "react";

export default function Proyectos() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    cost: "",
    servicio: "",
    fechaInicio: "",
    fechaFinEsperada: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(""); // success o error

  // Modo demo: simular lista de servicios
  useEffect(() => {
    // Simula servicios de ejemplo
    setServicios([
      "Consultoría Biotecnológica",
      "Análisis de Laboratorio",
      "Capacitación Técnica",
      "Desarrollo de Prototipos",
      "Asesoría en Regulación",
      "Transferencia de Tecnología"
    ]);
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMensaje("Proyecto creado con éxito 🎉");
        setTipoMensaje("success");
        setForm({
          descripcion: "",
          cost: "",
          servicio: "",
          fechaInicio: "",
          fechaFinEsperada: "",
        });
      } else {
        setMensaje("Error al crear el proyecto ❌");
        setTipoMensaje("error");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      setMensaje("No se pudo conectar con el servidor ⚠️");
      setTipoMensaje("error");
    }

    // El mensaje desaparece en 4 segundos
    setTimeout(() => setMensaje(null), 4000);
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
              Guardar Proyecto
            </button>
          </div>
        </form>
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
