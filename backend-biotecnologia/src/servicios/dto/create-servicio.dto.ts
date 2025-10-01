import { IsString, IsOptional, IsNumber, Min, Length } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @Length(3, 50)
  nombre: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;
}