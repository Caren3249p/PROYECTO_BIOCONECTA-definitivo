import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';

export class UpdateDocumentoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsInt()
  proyectoId?: number;

  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @IsOptional()
  @IsString()
  @IsIn(['privado', 'publico'])
  permiso?: string;
}