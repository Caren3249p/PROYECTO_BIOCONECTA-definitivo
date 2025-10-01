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
exports.DocumentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const documento_entity_1 = require("./documento.entity");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
let DocumentosService = class DocumentosService {
    documentoRepository;
    proyectoRepository;
    usuarioRepository;
    constructor(documentoRepository, proyectoRepository, usuarioRepository) {
        this.documentoRepository = documentoRepository;
        this.proyectoRepository = proyectoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async findAll() {
        return this.documentoRepository.find({ relations: ['proyecto', 'usuario'] });
    }
    async findOne(id) {
        const doc = await this.documentoRepository.findOne({
            where: { id },
            relations: ['proyecto', 'usuario'],
        });
        if (!doc)
            throw new common_1.NotFoundException('Documento no encontrado');
        return doc;
    }
    async create(data) {
        const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
        const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
        if (!proyecto)
            throw new common_1.NotFoundException('Proyecto no encontrado');
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const doc = this.documentoRepository.create({
            nombre: data.nombre,
            url: data.url,
            proyecto,
            usuario,
            permiso: data.permiso,
        });
        return this.documentoRepository.save(doc);
    }
    async update(id, data) {
        const doc = await this.documentoRepository.findOne({ where: { id } });
        if (!doc)
            throw new common_1.NotFoundException('Documento no encontrado');
        if (data.proyectoId) {
            const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
            if (!proyecto)
                throw new common_1.NotFoundException('Proyecto no encontrado');
            doc.proyecto = proyecto;
        }
        if (data.usuarioId) {
            const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
            if (!usuario)
                throw new common_1.NotFoundException('Usuario no encontrado');
            doc.usuario = usuario;
        }
        Object.assign(doc, data);
        await this.documentoRepository.save(doc);
        return this.findOne(id);
    }
    async remove(id) {
        await this.documentoRepository.delete(id);
    }
};
exports.DocumentosService = DocumentosService;
exports.DocumentosService = DocumentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(documento_entity_1.Documento)),
    __param(1, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __param(2, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DocumentosService);
//# sourceMappingURL=documentos.service.js.map