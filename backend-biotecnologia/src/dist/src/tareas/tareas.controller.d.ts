import { LogsService } from '../../logs/logs.service';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
export declare class TareasController {
    private readonly tareasService;
    private readonly logsService;
    constructor(tareasService: TareasService, logsService: LogsService);
    findAll(): Promise<Tarea[]>;
    findOne(id: string): Promise<Tarea | null>;
    create(data: CreateTareaDto, req: any): Promise<Tarea>;
    update(id: string, data: Partial<CreateTareaDto>, req: any): Promise<Tarea | null>;
    remove(id: string, req: any): Promise<void>;
}
