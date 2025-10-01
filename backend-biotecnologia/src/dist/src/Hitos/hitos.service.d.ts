import { Repository } from 'typeorm';
import { Hito } from './hitos.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';
export declare class HitosService {
    private readonly hitoRepository;
    private readonly proyectoRepository;
    constructor(hitoRepository: Repository<Hito>, proyectoRepository: Repository<Proyecto>);
    findAll(): Promise<Hito[]>;
    findOne(id: number): Promise<Hito>;
    findByProyecto(proyectoId: number): Promise<Hito[]>;
    create(data: CreateHitoDto): Promise<Hito>;
    update(id: number, data: UpdateHitoDto): Promise<Hito>;
    remove(id: number): Promise<void>;
    private checkRetraso;
}
