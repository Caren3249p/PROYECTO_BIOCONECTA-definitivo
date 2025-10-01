import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOneBy({ id });
    if (!rol) {
      throw new Error(`Rol with id ${id} not found`);
    }
    return rol;
  }

  create(data: Partial<Rol>): Promise<Rol> {
    const rol = this.rolRepository.create(data);
    return this.rolRepository.save(rol);
  }

  async update(id: number, data: Partial<Rol>): Promise<Rol> {
    await this.rolRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }
}