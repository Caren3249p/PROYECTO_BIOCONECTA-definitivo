import { Repository } from 'typeorm';
import { Servicio } from './servicio.entity';
export declare class ServiciosService {
    private readonly servicioRepository;
    constructor(servicioRepository: Repository<Servicio>);
    findAll(): Promise<Servicio[]>;
    findOne(id: number): Promise<Servicio>;
    create(data: Partial<Servicio>): Promise<Servicio>;
    update(id: number, data: Partial<Servicio>): Promise<Servicio>;
    remove(id: number): Promise<void>;
}
