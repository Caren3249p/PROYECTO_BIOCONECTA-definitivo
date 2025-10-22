import { IsString, IsInt, IsOptional } from 'class-validator';

export class CrearTareaDto {
  @IsString()
  descripcion: string;

  @IsInt()
  proyectoId: number;

  @IsInt()
  usuarioId: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
