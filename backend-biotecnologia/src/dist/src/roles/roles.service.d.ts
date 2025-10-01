import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
export declare class RolesService {
    private readonly rolRepository;
    constructor(rolRepository: Repository<Rol>);
    findAll(): Promise<Rol[]>;
    findOne(id: number): Promise<Rol>;
    create(data: Partial<Rol>): Promise<Rol>;
    update(id: number, data: Partial<Rol>): Promise<Rol>;
    remove(id: number): Promise<void>;
}
