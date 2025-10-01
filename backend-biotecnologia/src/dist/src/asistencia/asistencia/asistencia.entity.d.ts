import { Reserva } from '../../reservas/reserva.entity';
import { Usuario } from '../../usuarios/usuarios.entity';
export declare class Asistencia {
    id: number;
    reserva: Reserva;
    usuario: Usuario;
    presente: boolean;
    satisfaccion?: number;
}
