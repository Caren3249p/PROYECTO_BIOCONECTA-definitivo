import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricaProyecto } from './metrica-proyecto.entity';
import { Proyecto } from '../src/proyectos/proyectos.entity';
import { Tarea } from '../src/tareas/tarea.entity';
import { Hito } from '../src/Hitos/hitos.entity';
import { Documento } from '../src/Documentos/documento.entity';
import { Usuario } from '../src/usuarios/usuarios.entity';
import { MetricasService } from './metricas.service';
import { ReportesService } from './reportes.service';
import { ExportService } from './export.service';
import { ReportesController } from './reportes.controller';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MetricaProyecto,
      Proyecto,
      Tarea,
      Hito,
      Documento,
      Usuario
    ]),
    LogsModule
  ],
  providers: [MetricasService, ReportesService, ExportService],
  controllers: [ReportesController],
  exports: [MetricasService, ReportesService, ExportService]
})
export class MetricasModule {}