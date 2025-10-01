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
exports.Hito = void 0;
const typeorm_1 = require("typeorm");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
let Hito = class Hito {
    id;
    nombre;
    estado;
    fechaLimite;
    proyecto;
};
exports.Hito = Hito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Hito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hito.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pendiente' }),
    __metadata("design:type", String)
], Hito.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Hito.prototype, "fechaLimite", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyectos_entity_1.Proyecto, { nullable: false }),
    __metadata("design:type", proyectos_entity_1.Proyecto)
], Hito.prototype, "proyecto", void 0);
exports.Hito = Hito = __decorate([
    (0, typeorm_1.Entity)('hitos')
], Hito);
//# sourceMappingURL=hitos.entity.js.map