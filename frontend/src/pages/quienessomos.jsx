// src/pages/QuienesSomos.jsx
import Footer from "../components/Footer.jsx";

export default function QuienesSomos() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-gray-50">
      {/* Contenido principal */}
      <div className="p-10 max-w-6xl mx-auto flex-1">
        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          ¿Quiénes Somos?
        </h1>

        {/* Descripción */}
        <p className="text-lg text-gray-700 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-green-600">BIOCONECTA</span> es un centro de biotecnología que articula a 
          estudiantes, docentes, investigadores y comunidades, promoviendo proyectos innovadores con 
          impacto educativo, científico, social y ambiental. Con herramientas digitales e infraestructura de 
          vanguardia, facilitamos la gestión de iniciativas que responden a las necesidades reales del entorno.
        </p>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-green-600 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Misión</h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              En BIOCONECTA, gestionamos, coordinamos y fortalecemos proyectos en el campo de la biotecnología 
              que generen impacto educativo, científico y social. Promovemos la colaboración entre estudiantes, 
              docentes, investigadores y comunidades para desarrollar iniciativas innovadoras con enfoque sostenible. 
              Integramos conocimiento, tecnología y gestión eficiente para impulsar soluciones biotecnológicas que 
              conecten la ciencia con las necesidades reales del entorno.
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 border-t-4 border-blue-600 hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Visión</h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              En cinco años, seremos el centro de referencia a nivel nacional en la gestión de proyectos biotecnológicos, 
              reconocidos por articular actores académicos, institucionales y comunitarios en torno a iniciativas que 
              impulsan el desarrollo científico, tecnológico y ambiental del país. Consolidaremos un ecosistema digital 
              e interdisciplinario que sirva como puente entre la innovación y su aplicación práctica, promoviendo una 
              cultura de gestión responsable y transformación social a través de la biotecnología.
            </p>
          </div>
        </div>
      </div>

      {/* Footer siempre abajo */}
      <Footer />
    </main>
  );
}
