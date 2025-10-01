import { IsString, IsInt, IsIn } from 'class-validator';

export class CreateDocumentoDto {
  @IsString()
  nombre: string;

  @IsString()
  url: string;

  @IsInt()
  proyectoId: number;

  @IsInt()
  usuarioId: number;

  @IsString()
  @IsIn(['privado', 'publico'])
  permiso: string;
}