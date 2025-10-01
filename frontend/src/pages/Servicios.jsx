// src/pages/Servicios.jsx
import { Card, CardContent } from "../components/ui/card";

export default function Servicios() {
  const servicios = [
    {
      titulo: "Consultoría Biotecnológica",
      descripcion:
        "Asesoría especializada en procesos de innovación y soluciones en biotecnología.",
      icono: "🧬",
    },
    {
      titulo: "Investigación y Desarrollo",
      descripcion:
        "Diseñamos y ejecutamos proyectos de investigación adaptados a las necesidades de la industria.",
      icono: "🔬",
    },
    {
      titulo: "Capacitación",
      descripcion:
        "Ofrecemos formación académica y profesional en temas de biotecnología aplicada.",
      icono: "📚",
    },
    {
      titulo: "Sostenibilidad",
      descripcion:
        "Implementamos soluciones sostenibles y ecoamigables para el futuro.",
      icono: "🌱",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-teal-900 text-white flex flex-col items-center px-6 py-16">
      <h1 className="text-4xl font-bold mb-12 text-yellow-300 drop-shadow-md">
        Nuestros Servicios
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {servicios.map((servicio, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-green-700 to-green-600 text-center shadow-xl rounded-2xl p-6 border border-green-500 hover:scale-105 hover:shadow-2xl hover:border-yellow-400 transition-transform duration-300"
          >
            <CardContent>
              <div className="text-5xl mb-4">{servicio.icono}</div>
              <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
                {servicio.titulo}
              </h2>
              <p className="text-green-100">{servicio.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
