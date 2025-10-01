import { ProyectosService } from './proyectos.service';
import { Proyecto } from './proyectos.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { LogsService } from '../../logs/logs.service';
export declare class ProyectosController {
    private readonly proyectosService;
    private readonly logsService;
    constructor(proyectosService: ProyectosService, logsService: LogsService);
    findAll(): Promise<Proyecto[]>;
    findOne(id: string): Promise<Proyecto | null>;
    create(data: CreateProyectoDto, req: any): Promise<Proyecto>;
    remove(id: string, req: any): Promise<void>;
}
