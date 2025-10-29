import React from "react";

const Servicios = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-300">Servicios</h2>
      <div className="bg-slate-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <p className="text-lg text-slate-200 mb-4">
          Aquí puedes consultar y gestionar los servicios biotecnológicos disponibles en la plataforma. Próximamente podrás solicitar nuevos servicios y ver el estado de tus solicitudes.
        </p>
        <ul className="list-disc pl-6 text-slate-300">
          <li>Secuenciación genética</li>
          <li>Bioinformática</li>
          <li>Asesoría en proyectos</li>
          <li>Laboratorio de análisis</li>
          <li>Desarrollo de bioprocesos</li>
        </ul>
      </div>
    </div>
  );
};

export default Servicios;
