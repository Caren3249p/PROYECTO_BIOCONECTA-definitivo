import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindManyOptions } from 'typeorm';
import { HistorialParticipacion, TipoParticipacion } from './historial-participacion.entity';
import { FiltroHistorialDto, CrearHistorialDto } from './dto/historial-participacion.dto';
import { Usuario } from '../src/usuarios/usuarios.entity';
import { Proyecto } from '../src/proyectos/proyectos.entity';

@Injectable()
export class HistorialParticipacionService {
  constructor(
    @InjectRepository(HistorialParticipacion)
    private historialRepository: Repository<HistorialParticipacion>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  async obtenerHistorial(filtros: FiltroHistorialDto) {
    const { 
      usuarioId, 
      proyectoId, 
      tipoParticipacion, 
      fechaInicio, 
      fechaFin, 
      limite = 50, 
      pagina = 1 
    } = filtros;

    const queryBuilder = this.historialRepository
      .createQueryBuilder('historial')
      .leftJoinAndSelect('historial.usuario', 'usuario')
      .leftJoinAndSelect('historial.proyecto', 'proyecto')
      .where('historial.activo = :activo', { activo: true });

    if (usuarioId) {
      queryBuilder.andWhere('historial.usuario.id = :usuarioId', { usuarioId });
    }

    if (proyectoId) {
      queryBuilder.andWhere('historial.proyecto.id = :proyectoId', { proyectoId });
    }

    if (tipoParticipacion) {
      queryBuilder.andWhere('historial.tipoParticipacion = :tipoParticipacion', { tipoParticipacion });
    }

    if (fechaInicio && fechaFin) {
      queryBuilder.andWhere('historial.fechaEvento BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio,
        fechaFin
      });
    } else if (fechaInicio) {
      queryBuilder.andWhere('historial.fechaEvento >= :fechaInicio', { fechaInicio });
    } else if (fechaFin) {
      queryBuilder.andWhere('historial.fechaEvento <= :fechaFin', { fechaFin });
    }

    const total = await queryBuilder.getCount();
    
    const registros = await queryBuilder
      .orderBy('historial.fechaEvento', 'DESC')
      .skip((pagina - 1) * limite)
      .take(limite)
      .getMany();

    return {
      registros,
      total,
      pagina,
      totalPaginas: Math.ceil(total / limite),
      limite
    };
  }

  async crearRegistro(datos: CrearHistorialDto): Promise<HistorialParticipacion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id: datos.usuarioId } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    let proyecto: Proyecto | null = null;
    if (datos.proyectoId) {
      proyecto = await this.proyectoRepository.findOne({ where: { id: datos.proyectoId } });
    }

    const registro = this.historialRepository.create({
      usuario,
      tipoParticipacion: datos.tipoParticipacion,
      descripcion: datos.descripcion,
      entidadTipo: datos.entidadTipo,
      entidadId: datos.entidadId,
      proyecto: proyecto || undefined,
      metadatos: datos.metadatos
    });

    return await this.historialRepository.save(registro);
  }

  async obtenerEstadisticas(usuarioId?: number, fechaInicio?: string, fechaFin?: string) {
    const queryBuilder = this.historialRepository
      .createQueryBuilder('historial')
      .where('historial.activo = :activo', { activo: true });

    if (usuarioId) {
      queryBuilder.andWhere('historial.usuario.id = :usuarioId', { usuarioId });
    }

    if (fechaInicio && fechaFin) {
      queryBuilder.andWhere('historial.fechaEvento BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio,
        fechaFin
      });
    }

    const estadisticasPorTipo = await queryBuilder
      .select('historial.tipoParticipacion', 'tipo')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('historial.tipoParticipacion')
      .getRawMany();

    const total = await queryBuilder.getCount();

    const participacionPorMes = await queryBuilder
      .select('DATE_FORMAT(historial.fechaEvento, "%Y-%m")', 'mes')
      .addSelect('COUNT(*)', 'cantidad')
      .groupBy('mes')
      .orderBy('mes', 'DESC')
      .limit(12)
      .getRawMany();

    return {
      total,
      estadisticasPorTipo,
      participacionPorMes
    };
  }

  async obtenerTiposParticipacion() {
    return Object.values(TipoParticipacion).map(tipo => ({
      valor: tipo,
      etiqueta: this.obtenerEtiquetaTipo(tipo)
    }));
  }

  private obtenerEtiquetaTipo(tipo: TipoParticipacion): string {
    const etiquetas = {
      [TipoParticipacion.TAREA_ASIGNADA]: 'Tarea Asignada',
      [TipoParticipacion.TAREA_COMPLETADA]: 'Tarea Completada',
      [TipoParticipacion.RESERVA_CREADA]: 'Reserva Creada',
      [TipoParticipacion.RESERVA_COMPLETADA]: 'Reserva Completada',
      [TipoParticipacion.ASISTENCIA_REGISTRADA]: 'Asistencia Registrada',
      [TipoParticipacion.PROYECTO_ASIGNADO]: 'Proyecto Asignado',
      [TipoParticipacion.HITO_COMPLETADO]: 'Hito Completado',
      [TipoParticipacion.DOCUMENTO_SUBIDO]: 'Documento Subido'
    };
    return etiquetas[tipo] || tipo;
  }

  // Métodos de conveniencia para registrar eventos específicos
  async registrarTareaAsignada(usuarioId: number, tareaId: number, proyectoId?: number, descripcion?: string) {
    return this.crearRegistro({
      usuarioId,
      tipoParticipacion: TipoParticipacion.TAREA_ASIGNADA,
      descripcion: descripcion || 'Se asignó una nueva tarea',
      entidadTipo: 'tarea',
      entidadId: tareaId,
      proyectoId,
      metadatos: { tareaId }
    });
  }

  async registrarTareaCompletada(usuarioId: number, tareaId: number, proyectoId?: number, descripcion?: string) {
    return this.crearRegistro({
      usuarioId,
      tipoParticipacion: TipoParticipacion.TAREA_COMPLETADA,
      descripcion: descripcion || 'Se completó una tarea',
      entidadTipo: 'tarea',
      entidadId: tareaId,
      proyectoId,
      metadatos: { tareaId }
    });
  }

  async registrarReservaCreada(usuarioId: number, reservaId: number, servicioNombre?: string) {
    return this.crearRegistro({
      usuarioId,
      tipoParticipacion: TipoParticipacion.RESERVA_CREADA,
      descripcion: `Se creó una reserva${servicioNombre ? ` para ${servicioNombre}` : ''}`,
      entidadTipo: 'reserva',
      entidadId: reservaId,
      metadatos: { reservaId, servicioNombre }
    });
  }

  async registrarAsistencia(usuarioId: number, reservaId: number, servicioNombre?: string) {
    return this.crearRegistro({
      usuarioId,
      tipoParticipacion: TipoParticipacion.ASISTENCIA_REGISTRADA,
      descripcion: `Se registró asistencia${servicioNombre ? ` a ${servicioNombre}` : ''}`,
      entidadTipo: 'asistencia',
      entidadId: reservaId,
      metadatos: { reservaId, servicioNombre }
    });
  }
}