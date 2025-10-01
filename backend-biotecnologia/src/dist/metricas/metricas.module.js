"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const metrica_proyecto_entity_1 = require("./metrica-proyecto.entity");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
const tarea_entity_1 = require("../src/tareas/tarea.entity");
const hitos_entity_1 = require("../src/Hitos/hitos.entity");
const documento_entity_1 = require("../src/Documentos/documento.entity");
const usuarios_entity_1 = require("../src/usuarios/usuarios.entity");
const metricas_service_1 = require("./metricas.service");
const reportes_service_1 = require("./reportes.service");
const export_service_1 = require("./export.service");
const reportes_controller_1 = require("./reportes.controller");
const logs_module_1 = require("../logs/logs.module");
let MetricasModule = class MetricasModule {
};
exports.MetricasModule = MetricasModule;
exports.MetricasModule = MetricasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                metrica_proyecto_entity_1.MetricaProyecto,
                proyectos_entity_1.Proyecto,
                tarea_entity_1.Tarea,
                hitos_entity_1.Hito,
                documento_entity_1.Documento,
                usuarios_entity_1.Usuario
            ]),
            logs_module_1.LogsModule
        ],
        providers: [metricas_service_1.MetricasService, reportes_service_1.ReportesService, export_service_1.ExportService],
        controllers: [reportes_controller_1.ReportesController],
        exports: [metricas_service_1.MetricasService, reportes_service_1.ReportesService, export_service_1.ExportService]
    })
], MetricasModule);
//# sourceMappingURL=metricas.module.js.map