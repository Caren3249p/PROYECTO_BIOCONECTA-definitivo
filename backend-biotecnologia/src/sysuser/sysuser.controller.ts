// src/sysuser/sysuser.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './sysuser.service';
import { User } from './sysuser.entity';

@Controller('usuarios')
export class SysUserController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  async register(@Body() userData: Partial<User>) {
    try {
      const user = await this.service.create(userData as {
        userName: string;
        userLastname: string;
        email: string;
        password: string;
      }); // ✅ conversión explícita
      return { ok: true, user };
    } catch (error) {
      console.error('❌ Error en register:', error);
      return { ok: false, message: error.message || 'Error interno del servidor' };
    }
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
