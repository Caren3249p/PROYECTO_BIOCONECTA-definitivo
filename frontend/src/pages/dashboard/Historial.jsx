import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import React from "react";

const tipoParticipacionLabels = {
  tarea_asignada: "Tarea Asignada",
  tarea_completada: "Tarea Completada",
  reserva_creada: "Reserva Creada",
  reserva_completada: "Reserva Completada",
  asistencia_registrada: "Asistencia Registrada",
  proyecto_asignado: "Proyecto Asignado",
  hito_completado: "Hito Completado",
  documento_subido: "Documento Subido",
};

const tipoColors = {
  tarea_asignada: "bg-blue-950/40 text-blue-300",
  tarea_completada: "bg-green-950/40 text-green-300",
  reserva_creada: "bg-purple-950/40 text-purple-300",
  reserva_completada: "bg-indigo-950/40 text-indigo-300",
  asistencia_registrada: "bg-yellow-950/40 text-yellow-300",
  proyecto_asignado: "bg-orange-950/40 text-orange-300",
  hito_completado: "bg-emerald-950/40 text-emerald-300",
  documento_subido: "bg-pink-950/40 text-pink-300",
};

export default function Historial() {
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);
  const [historialFiltrado, setHistorialFiltrado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    tipoParticipacion: "",
    proyectoId: "",
    fechaInicio: "",
    fechaFin: "",
    limite: 20,
    pagina: 1,
  });
  const [estadisticas, setEstadisticas] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarHistorialDemo();
    cargarEstadisticasDemo();
    // eslint-disable-next-line
  }, []);

  // Cargar historial demo en localStorage pero NO mostrar automáticamente
  const cargarHistorialDemo = () => {
    setLoading(true);
    const demo = JSON.parse(localStorage.getItem("demo_historial") || "[]");
    setHistorial(demo);
    // Inicializar historialFiltrado como array vacío para que no se muestren actividades al cargar
    setHistorialFiltrado([]);
    setLoading(false);
  };

  // Función para filtrar historial
  const filtrarHistorial = () => {
    let historialFiltrado = [...historial];

    // Filtros locales
    if (filtros.tipoParticipacion) {
      historialFiltrado = historialFiltrado.filter(h => h.tipoParticipacion === filtros.tipoParticipacion);
    }

    // Filtro por fechas del proyecto (fechaInicio/fechaFinEsperada)
    if (filtros.fechaInicio && !filtros.fechaFin) {
      // Solo fecha inicio: mostrar proyectos que inician de esa fecha en adelante
      historialFiltrado = historialFiltrado.filter(h => {
        if (h.fechaInicio) {
          return h.fechaInicio >= filtros.fechaInicio;
        }
        // Para actividades sin fecha de proyecto, usar fechaEvento como fallback
        const fechaEvento = new Date(h.fechaEvento).toISOString().split('T')[0];
        return fechaEvento >= filtros.fechaInicio;
      });
    } else if (!filtros.fechaInicio && filtros.fechaFin) {
      // Solo fecha fin: mostrar proyectos que terminan antes de esa fecha
      historialFiltrado = historialFiltrado.filter(h => {
        if (h.fechaFinEsperada) {
          return h.fechaFinEsperada <= filtros.fechaFin;
        }
        // Para actividades sin fecha de proyecto, usar fechaEvento como fallback
        const fechaEvento = new Date(h.fechaEvento).toISOString().split('T')[0];
        return fechaEvento <= filtros.fechaFin;
      });
    } else if (filtros.fechaInicio && filtros.fechaFin) {
      // Ambas fechas: proyectos dentro del rango
      historialFiltrado = historialFiltrado.filter(h => {
        if (h.fechaInicio && h.fechaFinEsperada) {
          // Proyecto debe empezar después del inicio del filtro y terminar antes del fin del filtro
          return h.fechaInicio >= filtros.fechaInicio && h.fechaFinEsperada <= filtros.fechaFin;
        }
        // Para actividades sin fechas de proyecto, usar fechaEvento como fallback
        const fechaEvento = new Date(h.fechaEvento).toISOString().split('T')[0];
        return fechaEvento >= filtros.fechaInicio && fechaEvento <= filtros.fechaFin;
      });
    }

    // Aplicar límite
    const resultado = historialFiltrado.slice(0, filtros.limite);
    setHistorialFiltrado(resultado);
  };

  // Estadísticas demo
  const cargarEstadisticasDemo = () => {
    const demo = JSON.parse(localStorage.getItem("demo_historial") || "[]");
    setEstadisticas({
      totalActividades: demo.length,
      tareasCompletadas: demo.filter(h => h.tipoParticipacion === "tarea_completada").length,
      proyectosActivos: 1,
      actividadesSemana: demo.filter(h => {
        const fecha = new Date(h.fechaEvento);
        const ahora = new Date();
        const unaSemana = 7 * 24 * 60 * 60 * 1000;
        return ahora - fecha <= unaSemana;
      }).length,
    });
  };

  const formatearFecha = (fecha) =>
    new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleFiltroChange = (campo, valor) =>
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
      pagina: 1,
    }));

  if (loading && historial.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-teal-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p>Cargando historial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-teal-300 mb-2">
            📜 Historial de Participación
          </h1>
          <p className="text-gray-400">
            Seguimiento detallado de todas tus actividades en la plataforma
          </p>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Actividades", value: estadisticas.totalActividades, icon: "📊", color: "bg-teal-950/50 text-teal-300" },
              { label: "Tareas Completadas", value: estadisticas.tareasCompletadas, icon: "✅", color: "bg-green-950/50 text-green-300" },
              { label: "Proyectos Activos", value: estadisticas.proyectosActivos, icon: "🏗️", color: "bg-blue-950/50 text-blue-300" },
              { label: "Esta Semana", value: estadisticas.actividadesSemana, icon: "📅", color: "bg-purple-950/50 text-purple-300" },
            ].map((stat, i) => (
              <Card
                key={i}
                className="p-6 bg-slate-900/70 border border-teal-500/20 rounded-xl shadow-lg"
              >
                <div className="flex items-center">
                  <div
                    className={`p-3 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Filtros */}
        <Card className="p-6 mb-8 bg-slate-900/60 border border-teal-500/20 rounded-2xl">
          <h3 className="text-lg font-semibold text-teal-300 mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Tipo de Actividad
              </label>
              <select
                value={filtros.tipoParticipacion}
                onChange={(e) =>
                  handleFiltroChange("tipoParticipacion", e.target.value)
                }
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Todos</option>
                {Object.entries(tipoParticipacionLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={filtros.fechaInicio}
                onChange={(e) =>
                  handleFiltroChange("fechaInicio", e.target.value)
                }
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-teal-400"
                placeholder="Desde esta fecha..."
              />
              <p className="text-xs text-gray-500 mt-1">Proyectos que inician desde esta fecha</p>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                value={filtros.fechaFin}
                onChange={(e) => handleFiltroChange("fechaFin", e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-teal-400"
                placeholder="Hasta esta fecha..."
              />
              <p className="text-xs text-gray-500 mt-1">Proyectos que terminan hasta esta fecha</p>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Mostrar</label>
              <select
                value={filtros.limite}
                onChange={(e) => handleFiltroChange("limite", e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/50 border border-teal-500/30 rounded-lg text-gray-100 focus:ring-2 focus:ring-teal-400"
              >
                <option value="10">10 registros</option>
                <option value="20">20 registros</option>
                <option value="50">50 registros</option>
                <option value="100">100 registros</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={filtrarHistorial}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Filtrar Historial
              </button>
              <button
                onClick={() => {
                  setFiltros({
                    tipoParticipacion: "",
                    proyectoId: "",
                    fechaInicio: "",
                    fechaFin: "",
                    limite: 20,
                    pagina: 1,
                  });
                  setHistorialFiltrado([]);
                }}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>
        </Card>

        {/* Lista */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-lg text-red-300">
            <p>{error}</p>
          </div>
        )}

        <Card className="bg-slate-900/70 border border-teal-500/20 rounded-2xl">
          <div className="px-6 py-4 border-b border-teal-500/30">
            <h3 className="text-lg font-semibold text-teal-300">
              Actividades Recientes
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {historialFiltrado.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="text-lg mb-2">📝 No hay actividades para mostrar</p>
                <p className="text-sm">
                  {historial.length === 0 
                    ? "No hay actividades registradas aún." 
                    : "Usa 'Filtrar Historial' para ver las actividades disponibles."
                  }
                </p>
              </div>
            ) : (
              historialFiltrado.map((item, index) => (
                <div
                  key={item.id || index}
                  className="p-6 hover:bg-slate-800/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge
                        className={`px-3 py-1 text-sm rounded-full ${
                          tipoColors[item.tipoParticipacion] ||
                          "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {
                          tipoParticipacionLabels[item.tipoParticipacion] ||
                          item.tipoParticipacion
                        }
                      </Badge>
                      <h4 className="text-lg font-semibold text-white mt-2">
                        {item.descripcion}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        🕒 {formatearFecha(item.fechaEvento)}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-teal-950/50 rounded-full flex items-center justify-center text-teal-400 text-xl">
                      {item.tipoParticipacion.includes("completada")
                        ? "✅"
                        : item.tipoParticipacion.includes("asignada")
                        ? "📋"
                        : item.tipoParticipacion.includes("creada")
                        ? "✨"
                        : "📊"}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
