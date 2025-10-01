import { IsOptional, IsEnum, IsNumber, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TipoParticipacion } from '../historial-participacion.entity';

export class FiltroHistorialDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  usuarioId?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  proyectoId?: number;

  @IsOptional()
  @IsEnum(TipoParticipacion)
  tipoParticipacion?: TipoParticipacion;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limite?: number = 50;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  pagina?: number = 1;
}

export class CrearHistorialDto {
  @IsNumber()
  usuarioId: number;

  @IsEnum(TipoParticipacion)
  tipoParticipacion: TipoParticipacion;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  entidadTipo?: string;

  @IsOptional()
  @IsNumber()
  entidadId?: number;

  @IsOptional()
  @IsNumber()
  proyectoId?: number;

  @IsOptional()
  metadatos?: any;
}