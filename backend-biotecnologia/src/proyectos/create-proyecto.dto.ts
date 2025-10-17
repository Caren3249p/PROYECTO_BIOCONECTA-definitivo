// src/proyectos/create-proyecto.dto.ts
export class CrearProyectoDto {
  nombre: string;
  descripcion?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
  usuarioId: number;
  servicioId: number;
}
