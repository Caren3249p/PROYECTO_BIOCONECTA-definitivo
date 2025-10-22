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
exports.AsistenciaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const asistencia_entity_1 = require("./asistencia.entity");
const reserva_entity_1 = require("../../reservas/reserva.entity");
const usuarios_entity_1 = require("../../usuarios/usuarios.entity");
let AsistenciaService = class AsistenciaService {
    asistenciaRepository;
    reservaRepository;
    usuarioRepository;
    constructor(asistenciaRepository, reservaRepository, usuarioRepository) {
        this.asistenciaRepository = asistenciaRepository;
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async registrar(data) {
        const reserva = await this.reservaRepository.findOne({ where: { id: data.reservaId } });
        const usuario = await this.usuarioRepository.findOne({ where: { id: data.usuarioId } });
        if (!reserva || !usuario) {
            throw new common_1.BadRequestException('Reserva o usuario no encontrados');
        }
        const asistencia = this.asistenciaRepository.create({
            reserva,
            usuario,
            presente: data.presente,
            satisfaccion: undefined,
        });
        return this.asistenciaRepository.save(asistencia);
    }
    async findAll() {
        return this.asistenciaRepository.find({ relations: ['reserva', 'usuario'] });
    }
    async findByReserva(reservaId) {
        return this.asistenciaRepository.find({
            where: { reserva: { id: reservaId } },
            relations: ['reserva', 'usuario'],
        });
    }
};
exports.AsistenciaService = AsistenciaService;
exports.AsistenciaService = AsistenciaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(asistencia_entity_1.Asistencia)),
    __param(1, (0, typeorm_1.InjectRepository)(reserva_entity_1.Reserva)),
    __param(2, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AsistenciaService);
//# sourceMappingURL=asistencia.service.js.map