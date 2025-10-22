import { IsArray, IsOptional, IsDateString, IsString, IsIn, IsInt } from 'class-validator';

export class GenerarReporteDto {
  @IsString()
  @IsIn(['individual', 'comparativo', 'dashboard', 'riesgos', 'temporal'])
  tipoReporte: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  proyectoIds?: number[];

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metricasIncluidas?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  graficosIncluidos?: string[];
}