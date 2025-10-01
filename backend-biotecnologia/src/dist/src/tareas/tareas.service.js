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
exports.TareasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tarea_entity_1 = require("./tarea.entity");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
const usuarios_entity_1 = require("../usuarios/usuarios.entity");
let TareasService = class TareasService {
    tareaRepository;
    proyectoRepository;
    usuarioRepository;
    constructor(tareaRepository, proyectoRepository, usuarioRepository) {
        this.tareaRepository = tareaRepository;
        this.proyectoRepository = proyectoRepository;
        this.usuarioRepository = usuarioRepository;
    }
    findAll() {
        return this.tareaRepository.find({ relations: ['proyecto', 'usuario'] });
    }
    findOne(id) {
        return this.tareaRepository.findOne({
            where: { id },
            relations: ['proyecto', 'usuario'],
        });
    }
    async create(data) {
        const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
        const usuario = await this.usuarioRepository.findOneBy({ id: data.usuarioId });
        if (!proyecto || !usuario) {
            throw new Error('Proyecto o Usuario no encontrado');
        }
        const tarea = this.tareaRepository.create({
            descripcion: data.descripcion,
            estado: data.estado || 'pendiente',
            proyecto: proyecto,
            usuario: usuario,
        });
        return await this.tareaRepository.save(tarea);
    }
    async update(id, data) {
        await this.tareaRepository.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        await this.tareaRepository.delete(id);
    }
};
exports.TareasService = TareasService;
exports.TareasService = TareasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tarea_entity_1.Tarea)),
    __param(1, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __param(2, (0, typeorm_1.InjectRepository)(usuarios_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TareasService);
//# sourceMappingURL=tareas.service.js.map