import { IsString, IsDateString, IsInt, IsIn } from 'class-validator';

export class CreateHitoDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsIn(['pendiente', 'en progreso', 'completado', 'retrasado'])
  estado: string;

  @IsDateString()
  fechaLimite: string;

  @IsInt()
  proyectoId: number;
}