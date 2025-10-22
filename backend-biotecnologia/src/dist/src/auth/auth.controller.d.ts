import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    register(body: {
        nombre: string;
        email: string;
        password: string;
    }): Promise<import("../usuarios/usuarios.entity").Usuario>;
}
