import { Repository } from 'typeorm';
import { Proyecto } from './proyectos.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
export declare class ProyectosService {
    private readonly proyectoRepository;
    constructor(proyectoRepository: Repository<Proyecto>);
    findAll(): Promise<Proyecto[]>;
    findOne(id: number): Promise<Proyecto | null>;
    create(data: CreateProyectoDto): Promise<Proyecto>;
    remove(id: number): Promise<void>;
}
