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
exports.ReservasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const logs_service_1 = require("../../logs/logs.service");
const reservas_service_1 = require("./reservas.service");
const create_reserva_dto_1 = require("./dto/create-reserva.dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let ReservasController = class ReservasController {
    reservasService;
    logsService;
    constructor(reservasService, logsService) {
        this.reservasService = reservasService;
        this.logsService = logsService;
    }
    findAll() {
        return this.reservasService.findAll();
    }
    async create(data, req) {
        const reserva = await this.reservasService.create(data);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Creó una reserva');
        return reserva;
    }
    async update(id, estado, req) {
        const reserva = await this.reservasService.update(Number(id), estado);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Editó la reserva ${id}`);
        return reserva;
    }
    async remove(id, req) {
        await this.reservasService.remove(Number(id));
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Eliminó la reserva ${id}`);
    }
};
exports.ReservasController = ReservasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReservasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reserva_dto_1.CreateReservaDto, Object]),
    __metadata("design:returntype", Promise)
], ReservasController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ReservasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservasController.prototype, "remove", null);
exports.ReservasController = ReservasController = __decorate([
    (0, common_1.Controller)('reservas'),
    __param(1, (0, common_1.Inject)(logs_service_1.LogsService)),
    __metadata("design:paramtypes", [reservas_service_1.ReservasService,
        logs_service_1.LogsService])
], ReservasController);
//# sourceMappingURL=reservas.controller.js.map