"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hitos_entity_1 = require("./hitos.entity");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
const hitos_service_1 = require("./hitos.service");
const hitos_controller_1 = require("./hitos.controller");
let HitosModule = class HitosModule {
};
exports.HitosModule = HitosModule;
exports.HitosModule = HitosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([hitos_entity_1.Hito, proyectos_entity_1.Proyecto])],
        providers: [hitos_service_1.HitosService],
        controllers: [hitos_controller_1.HitosController],
    })
], HitosModule);
//# sourceMappingURL=hitos.module.js.map