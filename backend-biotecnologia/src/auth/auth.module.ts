// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module'; // <-- importar aquí

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'mi_clave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
    UsuariosModule, // <-- agregar aquí
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
