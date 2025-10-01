import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
export declare class TareasService {
    private readonly tareaRepository;
    private readonly proyectoRepository;
    private readonly usuarioRepository;
    constructor(tareaRepository: Repository<Tarea>, proyectoRepository: Repository<Proyecto>, usuarioRepository: Repository<Usuario>);
    findAll(): Promise<Tarea[]>;
    findOne(id: number): Promise<Tarea | null>;
    create(data: {
        descripcion: string;
        proyectoId: number;
        usuarioId: number;
        estado?: string;
    }): Promise<Tarea>;
    update(id: number, data: Partial<Tarea>): Promise<Tarea | null>;
    remove(id: number): Promise<void>;
}
