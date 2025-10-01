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
exports.Reserva = void 0;
const typeorm_1 = require("typeorm");
const servicio_entity_1 = require("../servicios/servicio.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
const asistencia_entity_1 = require("../asistencia/asistencia/asistencia.entity");
let Reserva = class Reserva {
    id;
    servicio;
    usuario;
    fechaReserva;
    fechaServicio;
    estado;
    asistencias;
};
exports.Reserva = Reserva;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reserva.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servicio_entity_1.Servicio, { eager: true }),
    __metadata("design:type", servicio_entity_1.Servicio)
], Reserva.prototype, "servicio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuarios_entity_1.Usuario, { eager: true }),
    __metadata("design:type", usuarios_entity_1.Usuario)
], Reserva.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reserva.prototype, "fechaReserva", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Reserva.prototype, "fechaServicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendiente' }),
    __metadata("design:type", String)
], Reserva.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asistencia_entity_1.Asistencia, (asistencia) => asistencia.reserva, { cascade: true }),
    __metadata("design:type", Array)
], Reserva.prototype, "asistencias", void 0);
exports.Reserva = Reserva = __decorate([
    (0, typeorm_1.Entity)()
], Reserva);
//# sourceMappingURL=reserva.entity.js.map