import { AsistenciaService } from './asistencia.service';
export declare class AsistenciaController {
    private readonly asistenciaService;
    constructor(asistenciaService: AsistenciaService);
    registrar(data: {
        reservaId: number;
        usuarioId: number;
        presente: boolean;
    }): Promise<import("./asistencia.entity").Asistencia>;
    findAll(): Promise<import("./asistencia.entity").Asistencia[]>;
    findByReserva(id: number): Promise<import("./asistencia.entity").Asistencia[]>;
}
