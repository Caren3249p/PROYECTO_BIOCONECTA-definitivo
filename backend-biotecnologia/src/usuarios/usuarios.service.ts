// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
  ) {}

  crear(data: CrearUsuarioDto) {
    const usuarios = this.usuariosRepo.create(data);
    return this.usuariosRepo.save(usuarios);
  }

  listar() {
    return this.usuariosRepo.find();
  }

  async buscarPorEmail(email: string) {
    return this.usuariosRepo.findOne({ where: { email } });
  }
}
