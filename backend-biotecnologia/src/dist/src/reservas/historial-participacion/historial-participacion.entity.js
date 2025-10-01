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
exports.HistorialParticipacion = exports.TipoParticipacion = void 0;
const typeorm_1 = require("typeorm");
const usuarios_entity_1 = require("../../usuarios/usuarios.entity");
const proyectos_entity_1 = require("../../proyectos/proyectos.entity");
var TipoParticipacion;
(function (TipoParticipacion) {
    TipoParticipacion["TAREA_ASIGNADA"] = "tarea_asignada";
    TipoParticipacion["TAREA_COMPLETADA"] = "tarea_completada";
    TipoParticipacion["RESERVA_CREADA"] = "reserva_creada";
    TipoParticipacion["RESERVA_COMPLETADA"] = "reserva_completada";
    TipoParticipacion["ASISTENCIA_REGISTRADA"] = "asistencia_registrada";
    TipoParticipacion["PROYECTO_ASIGNADO"] = "proyecto_asignado";
    TipoParticipacion["HITO_COMPLETADO"] = "hito_completado";
    TipoParticipacion["DOCUMENTO_SUBIDO"] = "documento_subido";
})(TipoParticipacion || (exports.TipoParticipacion = TipoParticipacion = {}));
let HistorialParticipacion = class HistorialParticipacion {
    id;
    usuario;
    tipoParticipacion;
    descripcion;
    entidadTipo;
    entidadId;
    proyecto;
    fechaEvento;
    metadatos;
    activo;
};
exports.HistorialParticipacion = HistorialParticipacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HistorialParticipacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarios_entity_1.Usuario, { eager: true }),
    __metadata("design:type", usuarios_entity_1.Usuario)
], HistorialParticipacion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoParticipacion
    }),
    __metadata("design:type", String)
], HistorialParticipacion.prototype, "tipoParticipacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HistorialParticipacion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], HistorialParticipacion.prototype, "entidadTipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], HistorialParticipacion.prototype, "entidadId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyectos_entity_1.Proyecto, { nullable: true, eager: true }),
    __metadata("design:type", proyectos_entity_1.Proyecto)
], HistorialParticipacion.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HistorialParticipacion.prototype, "fechaEvento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], HistorialParticipacion.prototype, "metadatos", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], HistorialParticipacion.prototype, "activo", void 0);
exports.HistorialParticipacion = HistorialParticipacion = __decorate([
    (0, typeorm_1.Entity)('historial_participacion')
], HistorialParticipacion);
//# sourceMappingURL=historial-participacion.entity.js.map