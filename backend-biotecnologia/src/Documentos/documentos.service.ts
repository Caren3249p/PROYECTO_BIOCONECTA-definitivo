import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './documento.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentoRepository: Repository<Documento>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Documento[]> {
    return this.documentoRepository.find({ relations: ['proyecto', 'usuario'] });
  }

  async findOne(id: number): Promise<Documento> {
    const doc = await this.documentoRepository.findOne({
      where: { id },
      relations: ['proyecto', 'usuario'],
    });
    if (!doc) throw new NotFoundException('Documento no encontrado');
    return doc;
  }

  async create(data: CreateDocumentoDto): Promise<Documento> {
    const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
    const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    const doc = this.documentoRepository.create({
      nombre: data.nombre,
      url: data.url,
      proyecto,
      usuario,
      permiso: data.permiso,
    });
    return this.documentoRepository.save(doc);
  }

  async update(id: number, data: UpdateDocumentoDto): Promise<Documento> {
    const doc = await this.documentoRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException('Documento no encontrado');
    if (data.proyectoId) {
      const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
      if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
      doc.proyecto = proyecto;
    }
    if (data.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
      if (!usuario) throw new NotFoundException('Usuario no encontrado');
      doc.usuario = usuario;
    }
    Object.assign(doc, data);
    await this.documentoRepository.save(doc);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.documentoRepository.delete(id);
  }
}