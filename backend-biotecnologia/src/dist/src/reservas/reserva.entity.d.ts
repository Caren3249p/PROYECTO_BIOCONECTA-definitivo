import { Servicio } from '../servicios/servicio.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { Asistencia } from '../asistencia/asistencia/asistencia.entity';
export declare class Reserva {
    id: number;
    servicio: Servicio;
    usuario: Usuario;
    fechaReserva: Date;
    fechaServicio: string;
    estado: string;
    asistencias: Asistencia[];
}
