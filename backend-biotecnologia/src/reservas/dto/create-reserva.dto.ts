import { IsInt, IsDateString, IsString } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  servicioId: number;

  @IsInt()
  usuarioId: number;

  @IsDateString()
  fechaServicio: string;

  @IsString()
  estado?: string;
}
