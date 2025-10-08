import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "../../components/ui/card.jsx";


const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    fechaInicio: '',
    fechaFin: '',
    proyectoId: '',
    tipoReporte: 'proyecto'
  });
  const [loading, setLoading] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/proyectos', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProyectos(data);
      }
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  };

  const generarReporte = async () => {
    if (!filtros.proyectoId && filtros.tipoReporte === 'proyecto') {
      alert('Selecciona un proyecto para generar el reporte');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = '';
      let options = {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      switch (filtros.tipoReporte) {
        case 'proyecto':
          url = `http://localhost:3000/reportes/proyecto/${filtros.proyectoId}`;
          options.method = 'GET';
          break;
        case 'comparativo':
          url = 'http://localhost:3000/reportes/comparativo';
          options.method = 'POST';
          options.body = JSON.stringify({ filtros });
          break;
        case 'dashboard':
          url = 'http://localhost:3000/reportes/dashboard';
          options.method = 'POST';
          options.body = JSON.stringify({ filtros });
          break;
        case 'riesgos':
          url = 'http://localhost:3000/reportes/riesgos';
          options.method = 'GET';
          break;
        default:
          break;
      }

      const response = await fetch(url, options);
      
      if (response.ok) {
        const data = await response.json();
        setReportes([data, ...reportes]);
      } else {
        alert('Error al generar el reporte');
      }
    } catch (error) {
      console.error('Error al generar reporte:', error);
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const exportarReporte = async (tipo, formato) => {
    if (!filtros.proyectoId && tipo === 'proyecto') {
      alert('Selecciona un proyecto para exportar');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let url = '';

      switch (tipo) {
        case 'proyecto':
          url = `http://localhost:3000/reportes/proyecto/${filtros.proyectoId}/export/${formato}`;
          break;
        case 'comparativo':
          url = `http://localhost:3000/reportes/comparativo/export/${formato}`;
          break;
        case 'dashboard':
          url = `http://localhost:3000/reportes/dashboard/export/${formato}`;
          break;
        case 'riesgos':
          url = `http://localhost:3000/reportes/riesgos/export/${formato}`;
          break;
      }

      const response = await fetch(url, {
        method: tipo === 'proyecto' || tipo === 'riesgos' ? 'GET' : 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: tipo === 'proyecto' || tipo === 'riesgos' ? null : JSON.stringify({ filtros })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `reporte-${tipo}-${new Date().toISOString().split('T')[0]}.${formato === 'pdf' ? 'pdf' : 'xlsx'}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Reporte exportado exitosamente');
      } else {
        alert('Error al exportar el reporte');
      }
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reportes y Métricas</h1>
          <p className="text-gray-600 mt-2">Genera y exporta reportes de desempeño de proyectos</p>
        </div>

        {/* Panel de Filtros */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">Configurar Reporte</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Reporte
                </label>
                <select
                  value={filtros.tipoReporte}
                  onChange={(e) => setFiltros({...filtros, tipoReporte: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="proyecto">Proyecto Individual</option>
                  <option value="comparativo">Comparativo</option>
                  <option value="dashboard">Dashboard Ejecutivo</option>
                  <option value="riesgos">Alertas de Riesgo</option>
                </select>
              </div>

              {filtros.tipoReporte === 'proyecto' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proyecto
                  </label>
                  <select
                    value={filtros.proyectoId}
                    onChange={(e) => setFiltros({...filtros, proyectoId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar proyecto...</option>
                    {proyectos.map(proyecto => (
                      <option key={proyecto.id} value={proyecto.id}>
                        {proyecto.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={filtros.fechaInicio}
                  onChange={(e) => setFiltros({...filtros, fechaInicio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={filtros.fechaFin}
                  onChange={(e) => setFiltros({...filtros, fechaFin: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={generarReporte}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generando...' : 'Generar Reporte'}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => exportarReporte(filtros.tipoReporte, 'pdf')}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  Exportar PDF
                </button>
                <button
                  onClick={() => exportarReporte(filtros.tipoReporte, 'excel')}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  Exportar Excel
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados de Reportes */}
        {reportes.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Reportes Generados</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reportes.map((reporte, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      {reporte.tipo === 'proyecto' && reporte.proyecto && `Reporte: ${reporte.proyecto.nombre}`}
                      {reporte.tipo === 'comparativo' && 'Análisis Comparativo'}
                      {reporte.tipo === 'dashboard' && 'Dashboard Ejecutivo'}
                      {reporte.tipo === 'riesgos' && 'Alertas de Riesgo'}
                    </h3>

                    {/* Mostrar métricas si existen */}
                    {reporte.metricas && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-sm text-gray-600">Progreso General</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {reporte.metricas.progresoGeneral}%
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-sm text-gray-600">Eficiencia</div>
                          <div className="text-2xl font-bold text-green-600">
                            {reporte.metricas.eficienciaTemporal}%
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded">
                          <div className="text-sm text-gray-600">Calidad</div>
                          <div className="text-2xl font-bold text-yellow-600">
                            {reporte.metricas.calidadEntregables}%
                          </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <div className="text-sm text-gray-600">Riesgo</div>
                          <div className={`text-2xl font-bold ${
                            reporte.metricas.nivelRiesgo === 'Alto' ? 'text-red-600' :
                            reporte.metricas.nivelRiesgo === 'Medio' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {reporte.metricas.nivelRiesgo}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mostrar resumen de tareas */}
                    {reporte.tareas && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Resumen de Tareas</h4>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-600">{reporte.tareas.completadas}</div>
                            <div className="text-sm text-gray-600">Completadas</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{reporte.tareas.enProgreso}</div>
                            <div className="text-sm text-gray-600">En Progreso</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-600">{reporte.tareas.pendientes}</div>
                            <div className="text-sm text-gray-600">Pendientes</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-red-600">{reporte.tareas.retrasadas}</div>
                            <div className="text-sm text-gray-600">Retrasadas</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mostrar alertas si existen */}
                    {reporte.alertas && reporte.alertas.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Alertas</h4>
                        <div className="space-y-2">
                          {reporte.alertas.map((alerta, alertIndex) => (
                            <div key={alertIndex} className={`p-3 rounded border-l-4 ${
                              alerta.tipo === 'error' ? 'bg-red-50 border-red-500' :
                              alerta.tipo === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                              'bg-blue-50 border-blue-500'
                            }`}>
                              <div className="font-medium">{alerta.titulo}</div>
                              <div className="text-sm text-gray-600">{alerta.mensaje}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {reportes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 text-lg">
                No se han generado reportes aún.
              </div>
              <p className="text-gray-500 mt-2">
                Configura los filtros y genera tu primer reporte.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reportes;