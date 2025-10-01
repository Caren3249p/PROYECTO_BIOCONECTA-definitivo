import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(data: CrearUsuarioDto, req: any): Promise<import("./usuarios.entity").Usuario>;
    listar(): Promise<import("./usuarios.entity").Usuario[]>;
}
