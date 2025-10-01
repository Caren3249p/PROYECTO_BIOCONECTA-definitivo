import { IsString, Length } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @Length(3, 30)
  nombre: string;
}