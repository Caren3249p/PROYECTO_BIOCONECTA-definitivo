import React from 'react';
import { Link } from 'react-router-dom';

const TerminosUso = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-teal-400 mb-6">
            Términos y Condiciones de Uso
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
            <p className="text-gray-300">
              Estos términos y condiciones rigen el uso de la plataforma <strong>Bioconecta</strong>. 
              Al registrarte y usar nuestros servicios, aceptas estos términos.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                1. Aceptación de los Términos
              </h2>
              <div className="text-gray-300">
                <p>
                  Al acceder y usar Bioconecta, confirmas que has leído, entendido y aceptas 
                  estos términos y condiciones, así como nuestra Política de Privacidad.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                2. Descripción del Servicio
              </h2>
              <div className="text-gray-300">
                <p>Bioconecta es una plataforma de gestión de proyectos biotecnológicos que permite:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Gestión de proyectos de investigación</li>
                  <li>Asignación y seguimiento de tareas</li>
                  <li>Colaboración entre estudiantes, asesores y administradores</li>
                  <li>Generación de reportes y métricas</li>
                  <li>Gestión de documentos y recursos</li>
                  <li>Sistema de reservas y servicios</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                3. Registro y Cuentas de Usuario
              </h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>Elegibilidad:</strong> Debes ser mayor de 18 años o tener autorización de un tutor legal.</p>
                
                <p><strong>Información Veraz:</strong> Te comprometes a proporcionar información precisa y actualizada.</p>
                
                <p><strong>Seguridad de Cuenta:</strong> Eres responsable de mantener segura tu contraseña y cuenta.</p>
                
                <p><strong>Roles Disponibles:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Estudiante:</strong> Acceso a proyectos asignados y tareas</li>
                  <li><strong>Asesor:</strong> Gestión de proyectos y supervisión de estudiantes</li>
                  <li><strong>Administrador:</strong> Control completo del sistema</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                4. Uso Aceptable
              </h2>
              <div className="text-gray-300">
                <p><strong>Puedes:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Usar la plataforma para fines académicos y de investigación</li>
                  <li>Colaborar de manera profesional con otros usuarios</li>
                  <li>Crear y gestionar proyectos biotecnológicos</li>
                  <li>Compartir conocimiento y recursos educativos</li>
                </ul>

                <p className="mt-4"><strong>No puedes:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Usar la plataforma para actividades ilegales</li>
                  <li>Subir contenido malicioso, spam o virus</li>
                  <li>Violar derechos de propiedad intelectual</li>
                  <li>Intentar hackear o comprometer la seguridad</li>
                  <li>Crear cuentas falsas o suplantar identidades</li>
                  <li>Usar la plataforma para fines comerciales no autorizados</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                5. Propiedad Intelectual
              </h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>Contenido de Bioconecta:</strong> Todos los derechos reservados a la Universidad Pontificia Bolivariana.</p>
                
                <p><strong>Tu Contenido:</strong> Mantienes los derechos sobre el contenido que subes, pero nos otorgas una licencia para operarlo en la plataforma.</p>
                
                <p><strong>Contenido Académico:</strong> Los proyectos y documentos están sujetos a las políticas académicas de la institución.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                6. Privacidad y Datos
              </h2>
              <div className="text-gray-300">
                <p>
                  El manejo de tus datos personales se rige por nuestra 
                  <Link to="/politica-privacidad" className="text-teal-400 hover:underline ml-1">
                    Política de Privacidad
                  </Link>
                  , que forma parte integral de estos términos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                7. Disponibilidad del Servicio
              </h2>
              <div className="text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Nos esforzamos por mantener el servicio disponible 24/7</li>
                  <li>Pueden ocurrir interrupciones por mantenimiento programado</li>
                  <li>No garantizamos disponibilidad absoluta del servicio</li>
                  <li>Te notificaremos sobre mantenimientos programados</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                8. Limitación de Responsabilidad
              </h2>
              <div className="text-gray-300">
                <p>Bioconecta y la Universidad Pontificia Bolivariana no serán responsables por:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Pérdida de datos no respaldados por el usuario</li>
                  <li>Daños indirectos o consecuenciales</li>
                  <li>Uso inadecuado de la plataforma por terceros</li>
                  <li>Interrupciones del servicio fuera de nuestro control</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                9. Suspensión y Terminación
              </h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>Por tu parte:</strong> Puedes cerrar tu cuenta en cualquier momento contactándonos.</p>
                
                <p><strong>Por nuestra parte:</strong> Podemos suspender o terminar tu cuenta si:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Violas estos términos de uso</li>
                  <li>Usas la plataforma de manera inapropiada</li>
                  <li>No eres elegible para usar el servicio</li>
                  <li>Por razones de seguridad o técnicas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                10. Modificaciones de los Términos
              </h2>
              <div className="text-gray-300">
                <p>
                  Podemos modificar estos términos ocasionalmente. Te notificaremos 
                  con al menos 30 días de anticipación sobre cambios significativos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                11. Ley Aplicable
              </h2>
              <div className="text-gray-300">
                <p>
                  Estos términos se rigen por las leyes de Colombia. 
                  Cualquier disputa será resuelta en los tribunales de Medellín, Colombia.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                12. Contacto
              </h2>
              <div className="text-gray-300">
                <p>Para preguntas sobre estos términos:</p>
                <div className="mt-2 bg-gray-700 p-4 rounded">
                  <p><strong>Email:</strong> legal@bioconecta.com</p>
                  <p><strong>Teléfono:</strong> +57 300 000 0000</p>
                  <p><strong>Dirección:</strong> Universidad Pontificia Bolivariana, Medellín</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <Link 
                to="/register" 
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                ← Volver al Registro
              </Link>
              <Link 
                to="/politica-privacidad" 
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Ver Política de Privacidad →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminosUso;