"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reserva_entity_1 = require("./reserva.entity");
const servicio_entity_1 = require("../servicios/servicio.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
const notificaciones_service_1 = require("../Notificaciones/notificaciones/notificaciones.service");
let ReservasService = class ReservasService {
    reservaRepository;
    servicioRepository;
    usuarioRepository;
    notificacionesService;
    constructor(reservaRepository, servicioRepository, usuarioRepository, notificacionesService) {
        this.reservaRepository = reservaRepository;
        this.servicioRepository = servicioRepository;
        this.usuarioRepository = usuarioRepository;
        this.notificacionesService = notificacionesService;
    }
    async create(data) {
        const existe = await this.reservaRepository.findOne({
            where: { servicio: { id: data.servicioId }, fechaServicio: data.fechaServicio },
        });
        if (existe) {
            throw new common_1.BadRequestException('El servicio ya está reservado en esa fecha');
        }
        const servicio = await this.servicioRepository.findOneBy({ id: data.servicioId });
        const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
        if (!servicio || !usuario) {
            throw new common_1.BadRequestException('Servicio o usuario no encontrado');
        }
        const reserva = this.reservaRepository.create({
            servicio,
            usuario,
            fechaServicio: data.fechaServicio,
            estado: data.estado || 'pendiente',
        });
        const reservaGuardada = await this.reservaRepository.save(reserva);
        await this.notificacionesService.enviarCorreo(usuario.email, 'Confirmación de Reserva', `Hola ${usuario.nombre}, tu reserva para el servicio "${servicio.nombre}" el día ${data.fechaServicio} ha sido registrada exitosamente.`);
        return reservaGuardada;
    }
    findAll() {
        return this.reservaRepository.find();
    }
    async update(id, estado) {
        await this.reservaRepository.update(id, { estado });
        return this.reservaRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.reservaRepository.delete(id);
    }
};
exports.ReservasService = ReservasService;
exports.ReservasService = ReservasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __param(1, (0, typeorm_1.InjectRepository)(servicio_entity_1.Servicio)),
    __param(2, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notificaciones_service_1.NotificacionesService])
], ReservasService);
//# sourceMappingURL=reservas.service.js.map