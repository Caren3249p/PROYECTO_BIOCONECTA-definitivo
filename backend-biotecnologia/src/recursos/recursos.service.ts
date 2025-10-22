import { Injectable } from '@nestjs/common';

export type TipoRecurso = 'laboratorio' | 'equipo' | 'sala';

export interface Recurso {
  id: number;
  tipo: TipoRecurso;
  nombre: string;
  disponible: boolean;
}

export interface Asignacion {
  id: number;
  recursoId: number;
  proyecto: string;
  fecha: string;
  estado: 'asignado' | 'liberado';
}

@Injectable()
export class RecursosService {
  private recursos: Recurso[] = [
    { id: 1, tipo: 'laboratorio', nombre: 'Lab 1', disponible: true },
    { id: 2, tipo: 'equipo', nombre: 'Microscopio', disponible: true },
    { id: 3, tipo: 'sala', nombre: 'Sala A', disponible: true },
  ];
  private asignaciones: Asignacion[] = [];
  private nextAsignacionId = 1;

  getTiposRecurso() {
    return ['laboratorio', 'equipo', 'sala'];
  }

  getRecursos() {
    return this.recursos;
  }

  asignarRecurso(recursoId: number, proyecto: string, fecha: string) {
    const recurso = this.recursos.find(r => r.id === recursoId);
    if (!recurso) throw new Error('Recurso no existe');
    if (!recurso.disponible) throw new Error('Recurso no disponible');
    recurso.disponible = false;
    const asignacion: Asignacion = {
      id: this.nextAsignacionId++,
      recursoId,
      proyecto,
      fecha,
      estado: 'asignado',
    };
    this.asignaciones.push(asignacion);
    return asignacion;
  }

  liberarRecurso(asignacionId: number) {
    const asignacion = this.asignaciones.find(a => a.id === asignacionId);
    if (!asignacion) throw new Error('Asignación no existe');
    if (asignacion.estado === 'liberado') throw new Error('Ya liberado');
    asignacion.estado = 'liberado';
    const recurso = this.recursos.find(r => r.id === asignacion.recursoId);
    if (recurso) recurso.disponible = true;
    return asignacion;
  }

  validarDisponibilidad(recursoId: number, fecha: string) {
    const recurso = this.recursos.find(r => r.id === recursoId);
    if (!recurso) throw new Error('Recurso no existe');
    if (!recurso.disponible) return false;
    // Simulación: si está disponible, no hay conflicto
    return true;
  }

  alertasConflicto() {
    // Simulación: retorna asignaciones de recursos no disponibles
    return this.recursos.filter(r => !r.disponible);
  }

  getAsignaciones() {
    return this.asignaciones;
  }
}
