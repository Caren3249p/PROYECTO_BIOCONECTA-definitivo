import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const tipoParticipacionLabels = {
  'tarea_asignada': 'Tarea Asignada',
  'tarea_completada': 'Tarea Completada',
  'reserva_creada': 'Reserva Creada',
  'reserva_completada': 'Reserva Completada',
  'asistencia_registrada': 'Asistencia Registrada',
  'proyecto_asignado': 'Proyecto Asignado',
  'hito_completado': 'Hito Completado',
  'documento_subido': 'Documento Subido'
};

const tipoColors = {
  'tarea_asignada': 'bg-blue-100 text-blue-800',
  'tarea_completada': 'bg-green-100 text-green-800',
  'reserva_creada': 'bg-purple-100 text-purple-800',
  'reserva_completada': 'bg-indigo-100 text-indigo-800',
  'asistencia_registrada': 'bg-yellow-100 text-yellow-800',
  'proyecto_asignado': 'bg-orange-100 text-orange-800',
  'hito_completado': 'bg-emerald-100 text-emerald-800',
  'documento_subido': 'bg-pink-100 text-pink-800'
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
    pagina: 1
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

      const res = await fetch(`http://localhost:3000/historial-participacion?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
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
      const res = await fetch("http://localhost:3000/historial-participacion/estadisticas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setEstadisticas(data.data);
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor,
      pagina: 1 // Reset página al cambiar filtros
    }));
  };

  if (loading && historial.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando historial...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Historial de Participación
          </h1>
          <p className="text-gray-600">
            Seguimiento detallado de todas tus actividades en la plataforma
          </p>
        </div>

        {/* Estadísticas */}
        {estadisticas && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-white">
              <div className="flex items-center">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Actividades</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.totalActividades}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tareas Completadas</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.tareasCompletadas}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">🏗️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.proyectosActivos}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                  <p className="text-2xl font-bold text-gray-900">{estadisticas.actividadesSemana}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filtros */}
        <Card className="p-6 mb-8 bg-white">
          <h3 className="text-lg font-semibold mb-4">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Actividad
              </label>
              <select
                value={filtros.tipoParticipacion}
                onChange={(e) => handleFiltroChange('tipoParticipacion', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Todos</option>
                {Object.entries(tipoParticipacionLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={filtros.fechaInicio}
                onChange={(e) => handleFiltroChange('fechaInicio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                value={filtros.fechaFin}
                onChange={(e) => handleFiltroChange('fechaFin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mostrar
              </label>
              <select
                value={filtros.limite}
                onChange={(e) => handleFiltroChange('limite', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="10">10 registros</option>
                <option value="20">20 registros</option>
                <option value="50">50 registros</option>
                <option value="100">100 registros</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => setFiltros({
                  tipoParticipacion: "",
                  proyectoId: "",
                  fechaInicio: "",
                  fechaFin: "",
                  limite: 20,
                  pagina: 1
                })}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </Card>

        {/* Lista de Historial */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <Card className="bg-white">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Actividades Recientes</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {historial.length === 0 ? (
              <div className="p-12 text-center">
                <span className="text-6xl mb-4 block">📝</span>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay actividades registradas
                </h3>
                <p className="text-gray-600">
                  Cuando realices actividades en la plataforma, aparecerán aquí.
                </p>
              </div>
            ) : (
              historial.map((item, index) => (
                <div key={item.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`${tipoColors[item.tipoParticipacion] || 'bg-gray-100 text-gray-800'}`}>
                          {tipoParticipacionLabels[item.tipoParticipacion] || item.tipoParticipacion}
                        </Badge>
                        {item.proyecto && (
                          <span className="text-sm text-gray-500">
                            Proyecto: {item.proyecto.nombre}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        {item.descripcion}
                      </h4>
                      
                      {item.metadatos && (
                        <div className="text-sm text-gray-600 mb-2">
                          {Object.entries(item.metadatos).map(([key, value]) => (
                            <span key={key} className="mr-4">
                              <strong>{key}:</strong> {value}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span>🕒 {formatearFecha(item.fechaEvento)}</span>
                        {item.entidadTipo && (
                          <span className="ml-4">
                            📋 {item.entidadTipo} #{item.entidadId}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <span className="text-teal-600 text-xl">
                          {item.tipoParticipacion.includes('completada') || item.tipoParticipacion.includes('completado') ? '✅' : 
                           item.tipoParticipacion.includes('asignada') || item.tipoParticipacion.includes('asignado') ? '📋' :
                           item.tipoParticipacion.includes('creada') || item.tipoParticipacion.includes('subido') ? '✨' : '📊'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {loading && (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}