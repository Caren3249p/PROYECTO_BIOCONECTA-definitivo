// src/components/FlipCard.jsx
import React from "react";
import "./FlipCard.css"; // estilos extra para la animación

export default function FlipCard() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flip-card w-80 h-96">
        <div className="flip-card-inner">
          {/* CARA 1 - IMAGEN */}
          <div className="flip-card-front flex items-center justify-center rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/static/images/img1corporativo.jpg"
              alt="Corporativo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARA 2 - TEXTO */}
          <div className="flip-card-back bg-[#00796b] flex flex-col items-center justify-center p-6 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-2">Equipo BioConecta</h2>
            <p className="text-center">
              Trabajamos contigo para conectar la biotecnología con la
              innovación y crear un futuro más sostenible.
            </p>
          </div>

          {/* CARA 3 - SERVICIOS */}
          <div className="flip-card-side bg-[#004d40] flex flex-col items-center justify-center p-6 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-2">Nuestros Servicios</h2>
            <ul className="text-center space-y-2">
              <li>🔬 Investigación</li>
              <li>💡 Innovación</li>
              <li>📊 Consultoría</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
