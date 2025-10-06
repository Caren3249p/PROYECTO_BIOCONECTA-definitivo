import { LogsService } from '../logs/logs.service';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
export declare class ReservasController {
    private readonly reservasService;
    private readonly logsService;
    constructor(reservasService: ReservasService, logsService: LogsService);
    findAll(): Promise<import("./reserva.entity").Reserva[]>;
    create(data: CreateReservaDto, req: any): Promise<import("./reserva.entity").Reserva>;
    update(id: string, estado: string, req: any): Promise<import("./reserva.entity").Reserva | null>;
    remove(id: string, req: any): Promise<void>;
}
