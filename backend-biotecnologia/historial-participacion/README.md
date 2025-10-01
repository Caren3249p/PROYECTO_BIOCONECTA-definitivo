# Módulo de Historial de Participación

## Descripción
El módulo de Historial de Participación registra automáticamente todas las actividades y eventos relevantes de los usuarios en el sistema, proporcionando un seguimiento completo de su participación en proyectos, tareas, reservas y otras actividades.

## Funcionalidades Principales

### 1. Registro Automático de Eventos
El sistema registra automáticamente los siguientes tipos de participación:

- **Tareas Asignadas**: Cuando se asigna una tarea a un usuario
- **Tareas Completadas**: Cuando un usuario completa una tarea
- **Reservas Creadas**: Cuando un usuario crea una reserva de servicio
- **Reservas Completadas**: Cuando se confirma la asistencia a un servicio
- **Asistencias Registradas**: Registro de asistencia a servicios/eventos
- **Proyectos Asignados**: Cuando se asigna un usuario a un proyecto
- **Hitos Completados**: Cuando se completan hitos importantes
- **Documentos Subidos**: Cuando se suben documentos al sistema

### 2. Consulta y Filtrado
Los usuarios pueden consultar su historial con múltiples opciones de filtrado:

- **Por tipo de participación**: Filtrar por tipo específico de actividad
- **Por fechas**: Rango de fechas personalizable
- **Por proyecto**: Ver actividades relacionadas con proyectos específicos
- **Paginación**: Navegación eficiente de grandes volúmenes de datos

### 3. Estadísticas y Métricas
El sistema proporciona estadísticas detalladas:

- **Total de actividades**: Contador global de participación
- **Distribución por tipo**: Cantidad de cada tipo de actividad
- **Tendencias mensuales**: Participación por mes
- **Última actividad**: Fecha y hora de la última participación

### 4. Exportación de Reportes
Generación de reportes en múltiples formatos:

- **Excel (.xlsx)**: Reporte completo con estadísticas
- **CSV**: Formato compatible con herramientas de análisis
- **Filtros aplicables**: Los reportes respetan los filtros activos

## Arquitectura Técnica

### Backend (NestJS)

#### Entidades
```typescript
// HistorialParticipacion Entity
- id: number (PK)
- usuario: Usuario (FK)
- tipoParticipacion: TipoParticipacion (enum)
- descripcion: string
- entidadTipo: string (opcional)
- entidadId: number (opcional)
- proyecto: Proyecto (FK, opcional)
- fechaEvento: Date
- metadatos: JSON (opcional)
- activo: boolean
```

#### Servicios
- **HistorialParticipacionService**: Lógica principal de gestión del historial
- **ReportesHistorialService**: Generación de reportes Excel y CSV

#### Controladores
- **HistorialParticipacionController**: Endpoints para consulta y gestión
- **ReportesHistorialController**: Endpoints para descarga de reportes

### Frontend (React)

#### Componentes Principales
- **HistorialParticipacion**: Página principal de consulta
- **Filtros de búsqueda**: Controles para filtrado avanzado
- **Vista de estadísticas**: Dashboard con métricas clave
- **Lista paginada**: Visualización de eventos de participación

#### Características de UI/UX
- **Diseño responsivo**: Adaptable a diferentes dispositivos
- **Filtros intuitivos**: Fácil selección de criterios de búsqueda
- **Indicadores visuales**: Badges de colores por tipo de participación
- **Exportación simple**: Botones de descarga directa

## API Endpoints

### Consulta de Historial
```
GET /api/historial-participacion/mi-historial
Query Parameters:
- tipoParticipacion?: string
- fechaInicio?: string (YYYY-MM-DD)
- fechaFin?: string (YYYY-MM-DD)
- pagina?: number (default: 1)
- limite?: number (default: 20)
```

### Estadísticas
```
GET /api/historial-participacion/estadisticas
Query Parameters:
- usuarioId?: number (solo admin)
- fechaInicio?: string
- fechaFin?: string
```

### Tipos de Participación
```
GET /api/historial-participacion/tipos-participacion
Response: Array de tipos disponibles con etiquetas
```

### Reportes
```
GET /api/reportes/historial-participacion/excel
GET /api/reportes/historial-participacion/csv
Query Parameters: mismos que consulta de historial
```

## Integración con Otros Módulos

### Módulo de Tareas
- Registra automáticamente tareas asignadas y completadas
- Se integra a través de hooks en TareasService

### Módulo de Reservas
- Registra creación de reservas y asistencias
- Se integra a través de hooks en ReservasService

### Módulo de Proyectos
- Puede registrar asignaciones de proyectos (futuro)
- Vincula eventos con proyectos específicos

## Seguridad y Permisos

### Usuarios Normales
- Solo pueden ver su propio historial
- No pueden crear registros manualmente (excepto casos especiales)
- Pueden exportar reportes de su propia participación

### Administradores
- Pueden ver historial de cualquier usuario
- Pueden crear registros manuales si es necesario
- Pueden generar reportes globales

## Instalación y Configuración

### Dependencias Backend
```bash
npm install exceljs  # Para generación de reportes Excel
```

### Base de Datos
El módulo creará automáticamente la tabla `historial_participacion` al iniciarse la aplicación (con synchronize: true).

### Variables de Entorno
No requiere configuración adicional de variables de entorno.

## Uso del Sistema

### Para Usuarios
1. **Acceder al historial**: Navegar a la página de "Mi Historial"
2. **Aplicar filtros**: Seleccionar tipo de actividad, fechas, etc.
3. **Ver estadísticas**: Revisar métricas personales en la parte superior
4. **Exportar datos**: Descargar reportes en Excel o CSV

### Para Administradores
1. **Consulta global**: Pueden filtrar por usuario específico
2. **Análisis de participación**: Revisar tendencias y patrones
3. **Reportes institucionales**: Generar reportes para análisis estratégico

## Mantenimiento

### Logs y Errores
- Los errores de registro se capturan en logs de consola
- No afectan la funcionalidad principal del sistema
- Se recomienda monitorear logs para identificar problemas

### Optimización
- Índices en campos de fecha y usuario para consultas rápidas
- Paginación para manejar grandes volúmenes de datos
- Cacheo de estadísticas frecuentes (implementación futura)

### Limpieza de Datos
- Considerar archivado de datos antiguos (>2 años)
- Implementar soft-delete para registros eliminados
- Backup regular de datos históricos

## Extensiones Futuras

### Funcionalidades Planificadas
1. **Dashboard de administrador**: Vista global de participación
2. **Notificaciones automáticas**: Alertas de baja participación
3. **Integración con más módulos**: Documentos, Hitos, etc.
4. **Analytics avanzados**: Tendencias y predicciones
5. **API pública**: Para integraciones externas

### Mejoras de UI
1. **Gráficos interactivos**: Visualización de tendencias
2. **Filtros guardados**: Consultas frecuentes predefinidas
3. **Vista de timeline**: Visualización cronológica mejorada
4. **Modo oscuro**: Tema alternativo para la interfaz

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades, contactar al equipo de desarrollo con:
- Descripción detallada del problema/solicitud
- Pasos para reproducir (en caso de bugs)
- Capturas de pantalla si es relevante
- Información del usuario y rol en el sistema