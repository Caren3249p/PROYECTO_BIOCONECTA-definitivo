import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asistencia } from './asistencia.entity';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Reserva } from '../../reservas/reserva.entity';
import { Usuario } from '../../usuarios/usuarios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, Reserva, Usuario])],
  providers: [AsistenciaService],
  controllers: [AsistenciaController],
})
export class AsistenciaModule {}
