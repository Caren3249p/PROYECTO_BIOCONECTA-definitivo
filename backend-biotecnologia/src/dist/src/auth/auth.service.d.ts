import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class AuthService {
    private usuariosService;
    private jwtService;
    constructor(usuariosService: UsuariosService, jwtService: JwtService);
    validarUsuario(email: string, pass: string): Promise<{
        id: number;
        nombre: string;
        tareas: import("../tareas/tarea.entity").Tarea[];
        email: string;
        rol: import("../roles/rol.entity").Rol;
        asistencias: any;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    registrar(nombre: string, email: string, password: string): Promise<import("../usuarios/usuarios.entity").Usuario>;
}
