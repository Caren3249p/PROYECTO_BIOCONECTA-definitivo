import { Repository } from 'typeorm';
import { Documento } from './documento.entity';
import { Proyecto } from '../proyectos/proyectos.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
export declare class DocumentosService {
    private readonly documentoRepository;
    private readonly proyectoRepository;
    private readonly usuarioRepository;
    constructor(documentoRepository: Repository<Documento>, proyectoRepository: Repository<Proyecto>, usuarioRepository: Repository<Usuario>);
    findAll(): Promise<Documento[]>;
    findOne(id: number): Promise<Documento>;
    create(data: CreateDocumentoDto): Promise<Documento>;
    update(id: number, data: UpdateDocumentoDto): Promise<Documento>;
    remove(id: number): Promise<void>;
}
