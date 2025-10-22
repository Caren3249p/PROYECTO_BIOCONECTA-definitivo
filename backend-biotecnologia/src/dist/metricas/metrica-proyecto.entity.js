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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricaProyecto = void 0;
const typeorm_1 = require("typeorm");
const proyectos_entity_1 = require("../src/proyectos/proyectos.entity");
let MetricaProyecto = class MetricaProyecto {
    id;
    proyecto;
    diasTranscurridos;
    diasRestantes;
    porcentajeAvance;
    porcentajeTiempo;
    totalTareas;
    tareasCompletadas;
    tareasEnProgreso;
    tareasPendientes;
    tareasRetrasadas;
    totalHitos;
    hitosCompletados;
    hitosRetrasados;
    usuariosActivos;
    documentosGenerados;
    indiceEficiencia;
    indiceCalidad;
    indiceColaboracion;
    nivelRiesgo;
    observaciones;
    fechaCalculo;
    fechaProximaRevision;
};
exports.MetricaProyecto = MetricaProyecto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyectos_entity_1.Proyecto, { nullable: false }),
    __metadata("design:type", proyectos_entity_1.Proyecto)
], MetricaProyecto.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "diasTranscurridos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "diasRestantes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "porcentajeAvance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "porcentajeTiempo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "totalTareas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "tareasCompletadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "tareasEnProgreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "tareasPendientes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "tareasRetrasadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "totalHitos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "hitosCompletados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "hitosRetrasados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "usuariosActivos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "documentosGenerados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "indiceEficiencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "indiceCalidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MetricaProyecto.prototype, "indiceColaboracion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['BAJO', 'MEDIO', 'ALTO', 'CRÍTICO'], default: 'BAJO' }),
    __metadata("design:type", String)
], MetricaProyecto.prototype, "nivelRiesgo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MetricaProyecto.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MetricaProyecto.prototype, "fechaCalculo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], MetricaProyecto.prototype, "fechaProximaRevision", void 0);
exports.MetricaProyecto = MetricaProyecto = __decorate([
    (0, typeorm_1.Entity)('metricas_proyecto')
], MetricaProyecto);
//# sourceMappingURL=metrica-proyecto.entity.js.map