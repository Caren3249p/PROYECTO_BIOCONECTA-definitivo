import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './proyectos.entity';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Servicio } from '../servicios/servicio.entity';
import { User } from '../sysuser/sysuser.entity';
import { Tarea } from '../tareas/tarea.entity'; // 👈 Asegúrate de importar Tarea
import { SysUserModule } from '../sysuser/sysuser.module';
import { Hito} from '../Hitos/hitos.entity'; // 👈 Asegúrate de importar Hito

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto, Servicio, User, Tarea, Hito]),
    SysUserModule,
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}
