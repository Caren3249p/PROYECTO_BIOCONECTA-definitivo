// src/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req, UsePipes } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ValidationPipe } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Administrador')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() data: CrearUsuarioDto, @Req() req) {
    return this.usuariosService.crear(data);
  }

  @Get()
  listar() {
    return this.usuariosService.listar();
  }
}
