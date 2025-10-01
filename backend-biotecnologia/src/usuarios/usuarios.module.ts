// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // <-- necesario para que AuthModule lo vea
})
export class UsuariosModule {}
