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
exports.HitosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hitos_entity_1 = require("./hitos.entity");
const proyectos_entity_1 = require("../proyectos/proyectos.entity");
let HitosService = class HitosService {
    hitoRepository;
    proyectoRepository;
    constructor(hitoRepository, proyectoRepository) {
        this.hitoRepository = hitoRepository;
        this.proyectoRepository = proyectoRepository;
    }
    async findAll() {
        const hitos = await this.hitoRepository.find({ relations: ['proyecto'] });
        return this.checkRetraso(hitos);
    }
    async findOne(id) {
        const hito = await this.hitoRepository.findOne({
            where: { id },
            relations: ['proyecto'],
        });
        if (!hito)
            throw new common_1.NotFoundException('Hito no encontrado');
        return this.checkRetraso([hito])[0];
    }
    async findByProyecto(proyectoId) {
        const hitos = await this.hitoRepository.find({
            where: { proyecto: { id: proyectoId } },
            relations: ['proyecto'],
        });
        return this.checkRetraso(hitos);
    }
    async create(data) {
        const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
        if (!proyecto)
            throw new common_1.NotFoundException('Proyecto no encontrado');
        const hito = this.hitoRepository.create({
            nombre: data.nombre,
            estado: data.estado,
            fechaLimite: data.fechaLimite,
            proyecto,
        });
        return this.hitoRepository.save(hito);
    }
    async update(id, data) {
        const hito = await this.hitoRepository.findOne({ where: { id } });
        if (!hito)
            throw new common_1.NotFoundException('Hito no encontrado');
        if (data.proyectoId) {
            const proyecto = await this.proyectoRepository.findOneBy({ id: data.proyectoId });
            if (!proyecto)
                throw new common_1.NotFoundException('Proyecto no encontrado');
            hito.proyecto = proyecto;
        }
        Object.assign(hito, data);
        await this.hitoRepository.save(hito);
        return this.findOne(id);
    }
    async remove(id) {
        await this.hitoRepository.delete(id);
    }
    checkRetraso(hitos) {
        const hoy = new Date();
        return hitos.map(hito => {
            if (hito.estado !== 'completado' &&
                hito.fechaLimite &&
                new Date(hito.fechaLimite) < hoy) {
                hito.estado = 'retrasado';
            }
            return hito;
        });
    }
};
exports.HitosService = HitosService;
exports.HitosService = HitosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hitos_entity_1.Hito)),
    __param(1, (0, typeorm_1.InjectRepository)(proyectos_entity_1.Proyecto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], HitosService);
//# sourceMappingURL=hitos.service.js.map