import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hito } from './hitos.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { HitosService } from './hitos.service';
import { HitosController } from './hitos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Hito, Proyecto])],
  providers: [HitosService],
  controllers: [HitosController],
})
export class HitosModule {}