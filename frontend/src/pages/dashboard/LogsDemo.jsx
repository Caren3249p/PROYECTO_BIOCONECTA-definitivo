import React, { useEffect, useState } from "react";

export default function LogsDemo() {
  const [logs, setLogs] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarLogs();
  }, []);

  const cargarLogs = () => {
    let demo = JSON.parse(localStorage.getItem("demo_logs") || "[]");
    if (filtro) {
      demo = demo.filter(l => l.accion.toLowerCase().includes(filtro.toLowerCase()) || l.usuario.toLowerCase().includes(filtro.toLowerCase()));
    }
    setLogs(demo);
  };

  const handleDelete = idx => {
    let demo = JSON.parse(localStorage.getItem("demo_logs") || "[]");
    demo.splice(idx, 1);
    localStorage.setItem("demo_logs", JSON.stringify(demo));
    cargarLogs();
    setMensaje("Log eliminado");
    setTimeout(() => setMensaje(""), 2000);
  };

  const handleClear = () => {
    localStorage.setItem("demo_logs", "[]");
    cargarLogs();
    setMensaje("Todos los logs eliminados");
    setTimeout(() => setMensaje(""), 2000);
  };

  const handleFiltro = e => {
    setFiltro(e.target.value);
    setTimeout(cargarLogs, 100);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Panel de Logs Demo</h2>
      {mensaje && <div className="mb-2 text-green-400">{mensaje}</div>}
      <div className="mb-4 flex gap-2">
        <input value={filtro} onChange={handleFiltro} placeholder="Filtrar por usuario o acción" className="p-2 rounded bg-gray-800 text-white flex-1" />
        <button onClick={handleClear} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded">Borrar todo</button>
      </div>
      <table className="w-full text-left bg-slate-900 rounded">
        <thead>
          <tr className="text-teal-400">
            <th className="p-2">Fecha</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Acción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && (
            <tr><td colSpan={4} className="p-4 text-center text-gray-400">No hay logs</td></tr>
          )}
          {logs.map((l, idx) => (
            <tr key={idx} className="border-b border-slate-700">
              <td className="p-2">{l.fecha}</td>
              <td className="p-2">{l.usuario}</td>
              <td className="p-2">{l.accion}</td>
              <td className="p-2">
                <button onClick={() => handleDelete(idx)} className="text-red-400 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
