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
exports.HitosController = void 0;
const common_1 = require("@nestjs/common");
const hitos_service_1 = require("./hitos.service");
const create_hito_dto_1 = require("./dto/create-hito.dto");
const update_hito_dto_1 = require("./dto/update-hito.dto");
let HitosController = class HitosController {
    hitosService;
    constructor(hitosService) {
        this.hitosService = hitosService;
    }
    findAll() {
        return this.hitosService.findAll();
    }
    findOne(id) {
        return this.hitosService.findOne(Number(id));
    }
    findByProyecto(proyectoId) {
        return this.hitosService.findByProyecto(Number(proyectoId));
    }
    create(data) {
        return this.hitosService.create(data);
    }
    update(id, data) {
        return this.hitosService.update(Number(id), data);
    }
    remove(id) {
        return this.hitosService.remove(Number(id));
    }
};
exports.HitosController = HitosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/proyecto/:proyectoId'),
    __param(0, (0, common_1.Param)('proyectoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "findByProyecto", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hito_dto_1.CreateHitoDto]),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hito_dto_1.UpdateHitoDto]),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HitosController.prototype, "remove", null);
exports.HitosController = HitosController = __decorate([
    (0, common_1.Controller)('hitos'),
    __metadata("design:paramtypes", [hitos_service_1.HitosService])
], HitosController);
//# sourceMappingURL=hitos.controller.js.map