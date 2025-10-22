import React from "react";

export default function Interfaz() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-teal-700">
        ¡Hola! 👋 Bienvenido a tu panel de estudiante
      </h2>

      <p className="text-gray-700">
        Desde aquí puedes revisar tus tareas, proyectos asignados, historial de
        participación y generar reportes sobre tu desempeño.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white shadow-md p-6 rounded-lg border-t-4 border-teal-500">
          <h3 className="text-lg font-bold mb-2">Tareas pendientes</h3>
          <p className="text-gray-600">Revisa tus próximas entregas.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500">
          <h3 className="text-lg font-bold mb-2">Proyectos activos</h3>
          <p className="text-gray-600">
            Consulta los proyectos en los que participas.
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border-t-4 border-green-500">
          <h3 className="text-lg font-bold mb-2">Reportes rápidos</h3>
          <p className="text-gray-600">
            Visualiza estadísticas de tu progreso académico.
          </p>
        </div>
      </div>
    </div>
  );
}
