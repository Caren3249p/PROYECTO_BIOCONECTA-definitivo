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
exports.Asistencia = void 0;
const typeorm_1 = require("typeorm");
const reserva_entity_1 = require("../../reservas/reserva.entity");
const usuarios_entity_1 = require("../../usuarios/usuarios.entity");
let Asistencia = class Asistencia {
    id;
    reserva;
    usuario;
    presente;
    satisfaccion;
};
exports.Asistencia = Asistencia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Asistencia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reserva_entity_1.Reserva, (reserva) => reserva.asistencias),
    __metadata("design:type", reserva_entity_1.Reserva)
], Asistencia.prototype, "reserva", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarios_entity_1.Usuario),
    __metadata("design:type", usuarios_entity_1.Usuario)
], Asistencia.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Asistencia.prototype, "presente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Asistencia.prototype, "satisfaccion", void 0);
exports.Asistencia = Asistencia = __decorate([
    (0, typeorm_1.Entity)()
], Asistencia);
//# sourceMappingURL=asistencia.entity.js.map