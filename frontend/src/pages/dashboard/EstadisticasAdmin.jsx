import React, { useEffect, useState } from "react";

export default function EstadisticasAdmin() {
  const [stats, setStats] = useState({
    proyectos: 0,
    tareas: 0,
    usuarios: 0,
    actividades: 0,
    tareasCompletadas: 0,
    proyectosActivos: 0,
  });

  useEffect(() => {
    const proyectos = JSON.parse(localStorage.getItem("demo_proyectos") || "[]");
    const tareas = JSON.parse(localStorage.getItem("demo_tareas") || "[]");
    const usuarios = JSON.parse(localStorage.getItem("demo_users") || "[]");
    const historial = JSON.parse(localStorage.getItem("demo_historial") || "[]");
    setStats({
      proyectos: proyectos.length,
      tareas: tareas.length,
      usuarios: usuarios.length,
      actividades: historial.length,
      tareasCompletadas: tareas.filter(t => t.estado === "completada").length,
      proyectosActivos: proyectos.filter(p => !p.fechaFinEsperada || new Date(p.fechaFinEsperada) > new Date()).length,
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-teal-300 text-center">Panel de Estadísticas Globales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-teal-400 mb-2">{stats.proyectos}</div>
          <div className="text-gray-300">Proyectos registrados</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-teal-400 mb-2">{stats.tareas}</div>
          <div className="text-gray-300">Tareas totales</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-teal-400 mb-2">{stats.usuarios}</div>
          <div className="text-gray-300">Usuarios demo</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-teal-400 mb-2">{stats.actividades}</div>
          <div className="text-gray-300">Actividades en historial</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-green-400 mb-2">{stats.tareasCompletadas}</div>
          <div className="text-gray-300">Tareas completadas</div>
        </div>
        <div className="bg-slate-900/80 rounded-xl p-6 shadow border border-teal-500/20 text-center">
          <div className="text-4xl font-bold text-orange-400 mb-2">{stats.proyectosActivos}</div>
          <div className="text-gray-300">Proyectos activos</div>
        </div>
      </div>
    </div>
  );
}
