import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [filtros, setFiltros] = useState({
    usuario: "",
    entidad: "",
    limite: 50,
  });
  const [mensaje, setMensaje] = useState("");
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    if (rol !== "Administrador" && rol !== "Gestor") {
      setMensaje("No tienes permisos para ver los logs del sistema");
      return;
    }
    
    cargarLogs();
    cargarEstadisticas();
  }, [navigate]);

  const cargarLogs = async () => {
    const token = localStorage.getItem("token");
    try {
      let url = "http://localhost:3000/logs?";
      if (filtros.usuario) url += `usuario=${filtros.usuario}&`;
      if (filtros.entidad) url += `entidad=${filtros.entidad}&`;
      url += `limite=${filtros.limite}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        setMensaje("Error al cargar los logs");
      }
    } catch {
      setMensaje("Error de conexión al cargar logs");
    }
  };

  const cargarEstadisticas = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/logs/estadisticas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setEstadisticas(data);
      }
    } catch {
      console.log("Error al cargar estadísticas");
    }
  };

  const probarSistema = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/logs/test", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      if (res.ok) {
        setMensaje("Prueba del sistema de logs ejecutada correctamente");
        cargarLogs();
        cargarEstadisticas();
      } else {
        setMensaje("Error al ejecutar la prueba");
      }
    } catch {
      setMensaje("Error de conexión en la prueba");
    }
  };

  const aplicarFiltros = () => {
    cargarLogs();
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <main className="flex-1 flex items-start justify-center py-10">
      <section className="card w-full max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold mb-2">REGISTRO DE ACCIONES DEL SISTEMA</h1>
            <div className="border-b-4 border-teal-600 w-32"></div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
              className="btn btn-secondary"
            >
              {mostrarEstadisticas ? "Ocultar" : "Mostrar"} Estadísticas
            </button>
            <button onClick={probarSistema} className="btn btn-primary">
              Probar Sistema
            </button>
          </div>
        </div>

        {mensaje && <p className="mb-4 text-red-600">{mensaje}</p>}

        {/* Filtros */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">Filtros</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="label">Usuario</label>
              <input
                type="text"
                className="input"
                value={filtros.usuario}
                onChange={(e) => setFiltros({...filtros, usuario: e.target.value})}
                placeholder="Email del usuario"
              />
            </div>
            <div>
              <label className="label">Entidad</label>
              <select
                className="input"
                value={filtros.entidad}
                onChange={(e) => setFiltros({...filtros, entidad: e.target.value})}
              >
                <option value="">Todas</option>
                <option value="tarea">Tareas</option>
                <option value="proyecto">Proyectos</option>
                <option value="servicio">Servicios</option>
                <option value="reserva">Reservas</option>
                <option value="sistema">Sistema</option>
              </select>
            </div>
            <div>
              <label className="label">Límite</label>
              <select
                className="input"
                value={filtros.limite}
                onChange={(e) => setFiltros({...filtros, limite: Number(e.target.value)})}
              >
                <option value={25}>25 registros</option>
                <option value={50}>50 registros</option>
                <option value={100}>100 registros</option>
                <option value={500}>500 registros</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={aplicarFiltros} className="btn btn-primary">
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {mostrarEstadisticas && estadisticas && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-3">Estadísticas del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-700">Total de Logs</h4>
                <p className="text-2xl font-bold text-blue-600">{estadisticas.totalLogs}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-700">Acciones más Frecuentes</h4>
                {estadisticas.accionesPorTipo?.slice(0, 3).map((accion, idx) => (
                  <p key={idx} className="text-sm">{accion.accion}: {accion.cantidad}</p>
                ))}
              </div>
              <div>
                <h4 className="font-medium text-blue-700">Usuarios más Activos</h4>
                {estadisticas.usuariosActivos?.slice(0, 3).map((usuario, idx) => (
                  <p key={idx} className="text-sm">{usuario.usuario}: {usuario.acciones} acciones</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tabla de Logs */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Fecha</th>
                <th className="border border-gray-300 p-2 text-left">Usuario</th>
                <th className="border border-gray-300 p-2 text-left">Acción</th>
                <th className="border border-gray-300 p-2 text-left">Entidad</th>
                <th className="border border-gray-300 p-2 text-left">ID</th>
                <th className="border border-gray-300 p-2 text-left">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-sm">
                    {formatearFecha(log.fecha)}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {log.usuario}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {log.accion}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {log.entidad || '-'}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {log.entidadId || '-'}
                  </td>
                  <td className="border border-gray-300 p-2 text-sm">
                    {log.ip || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No hay logs registrados</p>
        )}
      </section>
    </main>
  );
}