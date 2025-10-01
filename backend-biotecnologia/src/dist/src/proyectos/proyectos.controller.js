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
exports.ProyectosController = void 0;
const common_1 = require("@nestjs/common");
const proyectos_service_1 = require("./proyectos.service");
const create_proyecto_dto_1 = require("./dto/create-proyecto.dto");
const logs_service_1 = require("../../logs/logs.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ProyectosController = class ProyectosController {
    proyectosService;
    logsService;
    constructor(proyectosService, logsService) {
        this.proyectosService = proyectosService;
        this.logsService = logsService;
    }
    findAll() {
        return this.proyectosService.findAll();
    }
    findOne(id) {
        return this.proyectosService.findOne(Number(id));
    }
    async create(data, req) {
        const proyecto = await this.proyectosService.create(data);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Creó un proyecto');
        return proyecto;
    }
    async remove(id, req) {
        await this.proyectosService.remove(Number(id));
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Eliminó proyecto ${id}`);
    }
};
exports.ProyectosController = ProyectosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proyecto_dto_1.CreateProyectoDto, Object]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProyectosController.prototype, "remove", null);
exports.ProyectosController = ProyectosController = __decorate([
    (0, common_1.Controller)('proyectos'),
    __metadata("design:paramtypes", [proyectos_service_1.ProyectosService,
        logs_service_1.LogsService])
], ProyectosController);
//# sourceMappingURL=proyectos.controller.js.map