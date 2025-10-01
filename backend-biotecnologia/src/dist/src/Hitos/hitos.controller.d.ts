import { HitosService } from './hitos.service';
import { Hito } from './hitos.entity';
import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';
export declare class HitosController {
    private readonly hitosService;
    constructor(hitosService: HitosService);
    findAll(): Promise<Hito[]>;
    findOne(id: string): Promise<Hito>;
    findByProyecto(proyectoId: string): Promise<Hito[]>;
    create(data: CreateHitoDto): Promise<Hito>;
    update(id: string, data: UpdateHitoDto): Promise<Hito>;
    remove(id: string): Promise<void>;
}
