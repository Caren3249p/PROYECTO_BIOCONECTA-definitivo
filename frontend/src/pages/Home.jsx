import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-blue-600/10 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Conectando el futuro con{" "}
                  <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                    Biotecnología
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transformamos la ciencia en soluciones innovadoras para un mundo más sostenible. 
                  Únete a la revolución biotecnológica.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/unete"
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  Únete Ahora
                </Link>
                <Link
                  to="/quienes-somos"
                  className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 text-center"
                >
                  Conoce Más
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
              <img
                src="/img1corporativo.jpg"
                alt="Bioconecta Innovation"
                className="relative w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué elegir Bioconecta?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Somos pioneros en biotecnología, combinando ciencia de vanguardia con innovación sostenible
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Investigación Avanzada",
                description: "Proyectos de investigación en biotecnología aplicada a salud, agricultura y medio ambiente",
                icon: "🔬"
              },
              {
                title: "Innovación Sostenible",
                description: "Soluciones tecnológicas que conectan la ciencia con la industria para un futuro verde",
                icon: "🌱"
              },
              {
                title: "Consultoría Experta",
                description: "Asesoría especializada para implementar biotecnología en procesos empresariales",
                icon: "💡"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-teal-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Proyectos Activos" },
              { number: "100+", label: "Investigadores" },
              { number: "25+", label: "Países Alcanzados" },
              { number: "99%", label: "Satisfacción Cliente" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-teal-600/10 to-blue-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar el futuro?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a nuestra comunidad de innovadores y científicos que están cambiando el mundo con biotecnología
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Comienza Ahora
            </Link>
            <Link
              to="/servicios"
              className="border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
