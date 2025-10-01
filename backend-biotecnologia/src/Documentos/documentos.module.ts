import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './documento.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Documento, Proyecto, Usuario])],
  providers: [DocumentosService],
  controllers: [DocumentosController],
})
export class DocumentosModule {}