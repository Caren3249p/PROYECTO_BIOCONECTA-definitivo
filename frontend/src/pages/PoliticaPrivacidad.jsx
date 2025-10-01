import React from 'react';
import { Link } from 'react-router-dom';

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-teal-400 mb-6">
            Política de Privacidad y Protección de Datos
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES')}
            </p>
            <p className="text-gray-300">
              En <strong>Bioconecta</strong>, nos comprometemos a proteger y respetar tu privacidad. 
              Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                1. Información que Recopilamos
              </h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>Datos de Registro:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Correo electrónico</li>
                  <li>Fecha de nacimiento</li>
                  <li>Número de teléfono</li>
                  <li>Rol en la plataforma (Estudiante, Asesor, Administrador)</li>
                  <li>Contraseña (encriptada)</li>
                </ul>
                
                <p className="mt-4"><strong>Datos de Uso:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Acciones realizadas en la plataforma</li>
                  <li>Proyectos creados y gestionados</li>
                  <li>Tareas asignadas y completadas</li>
                  <li>Documentos subidos</li>
                  <li>Logs de actividad del sistema</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                2. Cómo Utilizamos tu Información
              </h2>
              <div className="text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Proporcionar y mantener nuestros servicios</li>
                  <li>Gestionar tu cuenta y autenticación</li>
                  <li>Facilitar la colaboración en proyectos</li>
                  <li>Generar reportes y métricas de proyecto</li>
                  <li>Mejorar la funcionalidad de la plataforma</li>
                  <li>Cumplir con obligaciones legales</li>
                  <li>Comunicarte actualizaciones importantes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                3. Base Legal para el Procesamiento
              </h2>
              <div className="text-gray-300">
                <p>Procesamos tus datos personales bajo las siguientes bases legales:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li><strong>Consentimiento:</strong> Cuando nos has dado tu consentimiento explícito</li>
                  <li><strong>Ejecución de contrato:</strong> Para proporcionar los servicios que solicitas</li>
                  <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y seguridad</li>
                  <li><strong>Obligación legal:</strong> Para cumplir con requisitos legales</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                4. Compartir Información
              </h2>
              <div className="text-gray-300">
                <p>No vendemos, intercambiamos o transferimos tu información personal a terceros, excepto:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Para proteger nuestros derechos y seguridad</li>
                  <li>Con proveedores de servicios que ayudan a operar nuestra plataforma</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                5. Seguridad de Datos
              </h2>
              <div className="text-gray-300">
                <p>Implementamos medidas de seguridad técnicas y organizativas apropiadas:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>Encriptación de contraseñas con bcrypt</li>
                  <li>Autenticación JWT para sesiones seguras</li>
                  <li>Controles de acceso basados en roles</li>
                  <li>Logs de auditoría de todas las acciones</li>
                  <li>Acceso restringido a datos sensibles</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                6. Tus Derechos
              </h2>
              <div className="text-gray-300">
                <p>Tienes derecho a:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar copia de tus datos personales</li>
                  <li><strong>Rectificación:</strong> Corregir datos incorrectos o incompletos</li>
                  <li><strong>Supresión:</strong> Solicitar eliminación de tus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                  <li><strong>Limitación:</strong> Solicitar restricción del procesamiento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                7. Retención de Datos
              </h2>
              <div className="text-gray-300">
                <p>Conservamos tus datos personales durante:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li>El tiempo que mantengas tu cuenta activa</li>
                  <li>3 años adicionales después del cierre de cuenta para fines de archivo</li>
                  <li>El tiempo requerido por obligaciones legales</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                8. Cookies y Tecnologías Similares
              </h2>
              <div className="text-gray-300">
                <p>Utilizamos las siguientes tecnologías:</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                  <li><strong>localStorage:</strong> Para mantener tu sesión activa</li>
                  <li><strong>JWT tokens:</strong> Para autenticación segura</li>
                  <li><strong>Cookies de sesión:</strong> Para funcionalidad de la plataforma</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                9. Contacto
              </h2>
              <div className="text-gray-300">
                <p>Para ejercer tus derechos o hacer preguntas sobre esta política, contacta:</p>
                <div className="mt-2 bg-gray-700 p-4 rounded">
                  <p><strong>Email:</strong> privacidad@bioconecta.com</p>
                  <p><strong>Teléfono:</strong> +57 300 000 0000</p>
                  <p><strong>Dirección:</strong> Universidad Pontificia Bolivariana</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-teal-300 mb-4">
                10. Cambios a esta Política
              </h2>
              <div className="text-gray-300">
                <p>
                  Podemos actualizar esta política ocasionalmente. Te notificaremos de cambios 
                  significativos por correo electrónico o mediante aviso en la plataforma.
                </p>
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
                to="/terminos" 
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Ver Términos de Uso →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;