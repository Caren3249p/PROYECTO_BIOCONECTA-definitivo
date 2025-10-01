import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
export declare class UsuariosService {
    private usuariosRepo;
    constructor(usuariosRepo: Repository<Usuario>);
    crear(data: CrearUsuarioDto): Promise<Usuario>;
    listar(): Promise<Usuario[]>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
}
