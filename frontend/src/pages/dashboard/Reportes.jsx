import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/card.jsx";

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [reportesFiltrados, setReportesFiltrados] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    proyectoId: "",
    tipoReporte: "proyecto",
  });
  const [loading, setLoading] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  // Cargar proyectos desde localStorage
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("demo_proyectos") || "[]");
    setProyectos(guardados);
    // Cargar reportes guardados pero NO mostrarlos automáticamente
    const reportesGuardados = JSON.parse(localStorage.getItem("demo_reportes") || "[]");
    setReportes(reportesGuardados);
    // Inicializar reportesFiltrados como array vacío para que no se muestren reportes al cargar
    setReportesFiltrados([]);
  }, []);

  // Función para filtrar reportes
  const filtrarReportes = () => {
    let reportesFiltrados = [...reportes];

    // Filtrar por tipo de reporte
    reportesFiltrados = reportesFiltrados.filter(reporte => reporte.tipo === filtros.tipoReporte);

    // Filtrar por proyecto si está seleccionado
    if (filtros.proyectoId) {
      reportesFiltrados = reportesFiltrados.filter(reporte => 
        String(reporte.proyecto?.id) === String(filtros.proyectoId)
      );
    }

    // Filtrar por fechas si están establecidas
    if (filtros.fechaInicio) {
      reportesFiltrados = reportesFiltrados.filter(reporte => {
        const fechaReporte = new Date(reporte.fecha.split('/').reverse().join('-'));
        const fechaInicio = new Date(filtros.fechaInicio);
        return fechaReporte >= fechaInicio;
      });
    }

    if (filtros.fechaFin) {
      reportesFiltrados = reportesFiltrados.filter(reporte => {
        const fechaReporte = new Date(reporte.fecha.split('/').reverse().join('-'));
        const fechaFin = new Date(filtros.fechaFin);
        return fechaReporte <= fechaFin;
      });
    }

    setReportesFiltrados(reportesFiltrados);
  };

  const generarReporte = () => {
    if (!filtros.proyectoId && filtros.tipoReporte === "proyecto") {
      alert("Selecciona un proyecto para generar el reporte");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const proyectoSel = proyectos.find((p) => String(p.id) === String(filtros.proyectoId));
      // Obtener tareas reales del proyecto seleccionado
      const todasTareas = JSON.parse(localStorage.getItem("demo_tareas") || "[]");
      const tareasProyecto = todasTareas.filter(t => String(t.proyectoId) === String(proyectoSel?.id));
      const completadas = tareasProyecto.filter(t => t.estado === "completada").length;
      const enProgreso = tareasProyecto.filter(t => t.estado === "en progreso").length;
      const pendientes = tareasProyecto.filter(t => t.estado === "pendiente").length;
      // Progreso: % de tareas completadas
      const totalTareas = tareasProyecto.length;
      const progresoGeneral = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;
      // Eficiencia: % de tareas no retrasadas (simulado)
      const eficienciaTemporal = totalTareas > 0 ? Math.round(((completadas + enProgreso) / totalTareas) * 100) : 0;
      // Calidad: simulado como % de tareas completadas sin errores (aquí igual a completadas)
      const calidadEntregables = progresoGeneral;
      // Riesgo: bajo si hay menos de 2 tareas pendientes, medio si 2-4, alto si más
      let nivelRiesgo = "Bajo";
      if (pendientes >= 4) nivelRiesgo = "Alto";
      else if (pendientes >= 2) nivelRiesgo = "Medio";
      // Alertas
      const alertas = [];
      if (pendientes > 0) {
        alertas.push({
          tipo: "warning",
          titulo: "Tareas próximas al vencimiento",
          mensaje: `${pendientes} tarea${pendientes > 1 ? 's' : ''} pendiente${pendientes > 1 ? 's' : ''} en este proyecto.`
        });
      }
      const nuevo = {
        id: Date.now(),
        tipo: filtros.tipoReporte,
        fecha: new Date().toLocaleDateString(),
        proyecto: proyectoSel,
        metricas: {
          progresoGeneral,
          eficienciaTemporal,
          calidadEntregables,
          nivelRiesgo,
        },
        tareas: {
          completadas,
          enProgreso,
          pendientes,
          retrasadas: 0, // No se calcula en demo
        },
        alertas,
      };
      const nuevosReportes = [nuevo, ...reportes];
      setReportes(nuevosReportes);
      localStorage.setItem("demo_reportes", JSON.stringify(nuevosReportes));
      // Mostrar automáticamente el reporte recién generado
      setReportesFiltrados([nuevo]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-teal-300 drop-shadow-md">
            📊 Reportes y Métricas
          </h1>
          <p className="text-gray-400 mt-2">
            Analiza, exporta y evalúa el desempeño de tus proyectos.
          </p>
        </div>

        {/* Panel de filtros */}
        <Card className="mb-8 bg-slate-900/70 border border-teal-500/30 backdrop-blur-lg rounded-2xl shadow-xl">
          <CardHeader>
            <h2 className="text-xl font-semibold text-teal-300">
              ⚙️ Configurar Reporte
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-teal-300 mb-1">
                  Tipo de Reporte
                </label>
                <select
                  value={filtros.tipoReporte}
                  onChange={(e) =>
                    setFiltros({ ...filtros, tipoReporte: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-800/70 border border-teal-500/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <option value="proyecto">Proyecto Individual</option>
                  <option value="comparativo">Comparativo</option>
                  <option value="dashboard">Dashboard Ejecutivo</option>
                  <option value="riesgos">Alertas de Riesgo</option>
                </select>
              </div>

              {filtros.tipoReporte === "proyecto" && (
                <div>
                  <label className="block text-sm text-teal-300 mb-1">
                    Proyecto
                  </label>
                  {proyectos.length === 0 ? (
                    <div className="text-gray-400 italic py-2 px-3 bg-slate-800/70 rounded-lg border border-teal-500/20">
                      No hay proyectos disponibles. Crea uno primero.
                    </div>
                  ) : (
                    <select
                      value={filtros.proyectoId}
                      onChange={(e) =>
                        setFiltros({ ...filtros, proyectoId: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-800/70 border border-teal-500/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    >
                      <option value="">Seleccionar proyecto...</option>
                      {proyectos.map((proyecto) => (
                        <option key={proyecto.id} value={proyecto.id}>
                          {proyecto.nombre || proyecto.descripcion || `Proyecto #${proyecto.id}`}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm text-teal-300 mb-1">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={filtros.fechaInicio}
                  onChange={(e) =>
                    setFiltros({ ...filtros, fechaInicio: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-800/70 border border-teal-500/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div>
                <label className="block text-sm text-teal-300 mb-1">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={filtros.fechaFin}
                  onChange={(e) =>
                    setFiltros({ ...filtros, fechaFin: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-800/70 border border-teal-500/20 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={generarReporte}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium shadow-md hover:from-teal-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Generando..." : "Generar Reporte"}
              </button>
              <button
                onClick={filtrarReportes}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Filtrar Reportes
              </button>
            </div>
          </CardContent>
        </Card>

        /* Resultados */
        {reportesFiltrados.length === 0 ? (
          <Card className="bg-slate-900/50 border border-teal-500/20 backdrop-blur-md text-center py-12">
            <CardContent>
              <p className="text-gray-400 text-lg">
                No hay reportes para mostrar.
              </p>
              <p className="text-gray-500 mt-2">
                Genera un nuevo reporte o usa 'Filtrar Reportes' para ver reportes existentes.
              </p>
            </CardContent>
          </Card>
        ) : (
          reportesFiltrados.map((reporte, index) => (
            <Card
              key={index}
              className="mb-8 bg-slate-900/60 border border-teal-500/20 rounded-2xl shadow-lg hover:border-teal-400/40 transition-all"
            >
              <CardHeader>
                <h3 className="text-2xl font-semibold text-teal-300">
                  📁 {reporte.proyecto?.nombre || reporte.proyecto?.descripcion || `Reporte ${reporte.tipo.toUpperCase()}`}
                </h3>
                <p className="text-gray-400 text-sm">📅 {reporte.fecha}</p>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-950/40 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-300">Progreso</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {reporte.metricas.progresoGeneral}%
                    </p>
                  </div>
                  <div className="bg-green-950/40 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-300">Eficiencia</p>
                    <p className="text-2xl font-bold text-green-400">
                      {reporte.metricas.eficienciaTemporal}%
                    </p>
                  </div>
                  <div className="bg-yellow-950/40 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-300">Calidad</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {reporte.metricas.calidadEntregables}%
                    </p>
                  </div>
                  <div className="bg-purple-950/40 rounded-lg p-3 text-center">
                    <p className="text-sm text-gray-300">Riesgo</p>
                    <p className="text-2xl font-bold text-red-400">
                      {reporte.metricas.nivelRiesgo}
                    </p>
                  </div>
                </div>

                {reporte.alertas?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-teal-300 mb-2">
                      ⚠️ Alertas
                    </h4>
                    {reporte.alertas.map((alerta, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border-l-4 ${
                          alerta.tipo === "error"
                            ? "bg-red-950/40 border-red-500/60"
                            : alerta.tipo === "warning"
                            ? "bg-yellow-950/40 border-yellow-400/60"
                            : "bg-blue-950/40 border-blue-400/60"
                        } text-gray-200 mb-2`}
                      >
                        <div className="font-semibold text-white">
                          {alerta.titulo}
                        </div>
                        <div className="text-sm">{alerta.mensaje}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Reportes;
