"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const documento_entity_1 = require("./documento.entity");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
const documentos_service_1 = require("./documentos.service");
const documentos_controller_1 = require("./documentos.controller");
let DocumentosModule = class DocumentosModule {
};
exports.DocumentosModule = DocumentosModule;
exports.DocumentosModule = DocumentosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([documento_entity_1.Documento, proyectos_entity_1.Proyecto, usuarios_entity_1.Usuario])],
        providers: [documentos_service_1.DocumentosService],
        controllers: [documentos_controller_1.DocumentosController],
    })
], DocumentosModule);
//# sourceMappingURL=documentos.module.js.map