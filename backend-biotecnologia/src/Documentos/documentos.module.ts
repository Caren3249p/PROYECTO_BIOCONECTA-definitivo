import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documento } from './documento.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { User } from '@sysuser/sysuser.entity';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Documento, Proyecto, User])],
  providers: [DocumentosService],
  controllers: [DocumentosController],
})
export class DocumentosModule {}