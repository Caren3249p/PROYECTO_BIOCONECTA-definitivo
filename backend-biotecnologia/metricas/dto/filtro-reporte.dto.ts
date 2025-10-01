import { IsOptional, IsDateString, IsString, IsArray, IsIn, IsInt, Min, Max } from 'class-validator';

export class FiltroReporteDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  proyectoIds?: number[];

  @IsOptional()
  @IsString()
  @IsIn(['BAJO', 'MEDIO', 'ALTO', 'CRÍTICO'])
  nivelRiesgo?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  avanceMinimo?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  avanceMaximo?: number;

  @IsOptional()
  @IsString()
  @IsIn(['nombre', 'fechaInicio', 'porcentajeAvance', 'nivelRiesgo', 'indiceEficiencia'])
  ordenarPor?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  ordenDireccion?: string;
}