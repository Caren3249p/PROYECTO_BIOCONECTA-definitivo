import { LogsService } from '../../logs/logs.service';
import { ServiciosService } from './servicios.service';
import { Servicio } from './servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
export declare class ServiciosController {
    private readonly serviciosService;
    private readonly logsService;
    constructor(serviciosService: ServiciosService, logsService: LogsService);
    findAll(): Promise<Servicio[]>;
    findOne(id: string): Promise<Servicio>;
    create(data: CreateServicioDto, req: any): Promise<Servicio>;
    update(id: string, data: Partial<CreateServicioDto>, req: any): Promise<Servicio>;
    remove(id: string, req: any): Promise<void>;
}
