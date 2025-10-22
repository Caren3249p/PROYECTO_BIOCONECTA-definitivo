import { Repository } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Servicio } from '../servicios/servicio.entity';
import { Usuario } from '../usuarios/usuarios.entity';
import { NotificacionesService } from '../Notificaciones/notificaciones/notificaciones.service';
export declare class ReservasService {
    private readonly reservaRepository;
    private readonly servicioRepository;
    private readonly usuarioRepository;
    private readonly notificacionesService;
    constructor(reservaRepository: Repository<Reserva>, servicioRepository: Repository<Servicio>, usuarioRepository: Repository<Usuario>, notificacionesService: NotificacionesService);
    create(data: {
        servicioId: number;
        usuarioId: number;
        fechaServicio: string;
        estado?: string;
    }): Promise<Reserva>;
    findAll(): Promise<Reserva[]>;
    update(id: number, estado: string): Promise<Reserva | null>;
    remove(id: number): Promise<void>;
}
