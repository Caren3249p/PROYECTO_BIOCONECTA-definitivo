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
exports.TareasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const logs_service_1 = require("../../logs/logs.service");
const tareas_service_1 = require("./tareas.service");
const create_tarea_dto_1 = require("./dto/create-tarea.dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let TareasController = class TareasController {
    tareasService;
    logsService;
    constructor(tareasService, logsService) {
        this.tareasService = tareasService;
        this.logsService = logsService;
    }
    findAll() {
        return this.tareasService.findAll();
    }
    findOne(id) {
        return this.tareasService.findOne(Number(id));
    }
    async create(data, req) {
        const tarea = await this.tareasService.create(data);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, 'Creó una tarea');
        return tarea;
    }
    async update(id, data, req) {
        const tarea = await this.tareasService.update(Number(id), data);
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Editó la tarea ${id}`);
        return tarea;
    }
    async remove(id, req) {
        await this.tareasService.remove(Number(id));
        const usuario = req.user?.email || 'anonimo';
        await this.logsService.registrar(usuario, `Eliminó la tarea ${id}`);
    }
};
exports.TareasController = TareasController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tarea_dto_1.CreateTareaDto, Object]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Gestor', 'Administrador'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TareasController.prototype, "remove", null);
exports.TareasController = TareasController = __decorate([
    (0, common_1.Controller)('tareas'),
    __param(1, (0, common_1.Inject)(logs_service_1.LogsService)),
    __metadata("design:paramtypes", [tareas_service_1.TareasService,
        logs_service_1.LogsService])
], TareasController);
//# sourceMappingURL=tareas.controller.js.map