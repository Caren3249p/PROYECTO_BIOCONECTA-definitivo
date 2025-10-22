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
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    cargarHistorial();
    cargarEstadisticas();
  }, [navigate, filtros]);

  const cargarHistorial = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await fetch(
        `http://localhost:3000/historial-participacion?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setHistorial(data.data.registros || []);
      } else {
        setError("Error al cargar el historial");
      }
    } catch (error) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:3000/historial-participacion/estadisticas",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setEstadisticas(data.data);
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
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
              />
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
              />
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

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFiltros({
                    tipoParticipacion: "",
                    proyectoId: "",
                    fechaInicio: "",
                    fechaFin: "",
                    limite: 20,
                    pagina: 1,
                  })
                }
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Limpiar Filtros
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
            {historial.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                📝 No hay actividades registradas
              </div>
            ) : (
              historial.map((item, index) => (
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
