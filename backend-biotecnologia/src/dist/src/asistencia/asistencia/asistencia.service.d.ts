import { Repository } from 'typeorm';
import { Asistencia } from './asistencia.entity';
import { Reserva } from '../../reservas/reserva.entity';
import { Usuario } from '../../usuarios/usuarios.entity';
export declare class AsistenciaService {
    private readonly asistenciaRepository;
    private readonly reservaRepository;
    private readonly usuarioRepository;
    constructor(asistenciaRepository: Repository<Asistencia>, reservaRepository: Repository<Reserva>, usuarioRepository: Repository<Usuario>);
    registrar(data: {
        reservaId: number;
        usuarioId: number;
        presente: boolean;
    }): Promise<Asistencia>;
    findAll(): Promise<Asistencia[]>;
    findByReserva(reservaId: number): Promise<Asistencia[]>;
}
