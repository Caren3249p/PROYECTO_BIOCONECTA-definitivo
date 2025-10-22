"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialParticipacionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const historial_participacion_controller_1 = require("./historial-participacion.controller");
const historial_participacion_service_1 = require("./historial-participacion.service");
const reportes_historial_controller_1 = require("./reportes-historial.controller");
const reportes_historial_service_1 = require("./reportes-historial.service");
const historial_participacion_entity_1 = require("./historial-participacion.entity");
const usuarios_entity_1 = require("../src/usuarios/usuarios.entity");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
let HistorialParticipacionModule = class HistorialParticipacionModule {
};
exports.HistorialParticipacionModule = HistorialParticipacionModule;
exports.HistorialParticipacionModule = HistorialParticipacionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([historial_participacion_entity_1.HistorialParticipacion, usuarios_entity_1.Usuario, proyectos_entity_1.Proyecto])
        ],
        controllers: [historial_participacion_controller_1.HistorialParticipacionController, reportes_historial_controller_1.ReportesHistorialController],
        providers: [historial_participacion_service_1.HistorialParticipacionService, reportes_historial_service_1.ReportesHistorialService],
        exports: [historial_participacion_service_1.HistorialParticipacionService]
    })
], HistorialParticipacionModule);
//# sourceMappingURL=historial-participacion.module.js.map