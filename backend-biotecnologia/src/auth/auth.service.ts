// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, pass: string) {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (usuario && await bcrypt.compare(pass, usuario.password)) {
      const { password, ...resultado } = usuario;
      return resultado;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registrar(nombre: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usuariosService.crear({ nombre, email, password: hashed });
  }
}
