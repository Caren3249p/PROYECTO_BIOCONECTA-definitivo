import { IsString, IsEmail, IsOptional, IsNumber, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 45)
  userName: string;

  @IsString()
  @Length(2, 45)
  userLastname: string;

  @IsEmail({}, { message: 'Debe ser un correo válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsNumber()
  userRole_iduserRole?: number;

  @IsOptional()
  @IsNumber()
  userStatus_iduserStatus?: number;

  @IsOptional()
  @IsNumber()
  company_idcompany?: number;
}
