import { IsString, IsOptional, IsDateString, Length } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @Length(3, 50)
  nombre: string;




  @IsOptional()
  @IsString()
  @Length(0, 255)
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

 
}