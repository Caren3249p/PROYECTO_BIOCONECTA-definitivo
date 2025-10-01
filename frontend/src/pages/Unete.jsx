// src/pages/Unete.jsx
import React from "react";
import Button from "../components/botton";

export default function Unete() {
  return (
    <section className="bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Únete a BioConecta 🌱
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Sé parte de nuestra red de innovación biotecnológica.  
          Conéctate con investigadores, estudiantes y comunidades que buscan transformar el futuro mediante la biotecnología.
        </p>

        {/* 👇 Botón usando tu color principal */}
        <Button onClick={() => alert("Formulario próximamente 🚀")}>
          Quiero unirme
        </Button>
      </div>
    </section>
  );
}
