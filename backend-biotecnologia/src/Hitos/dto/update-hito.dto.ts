import { IsOptional, IsString, IsDateString, IsIn, IsInt } from 'class-validator';

export class UpdateHitoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'en progreso', 'completado', 'retrasado'])
  estado?: string;

  @IsOptional()
  @IsDateString()
  fechaLimite?: string;

  @IsOptional()
  @IsInt()
  proyectoId?: number;
}