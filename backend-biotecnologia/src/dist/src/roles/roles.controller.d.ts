import { RolesService } from './roles.service';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(): Promise<Rol[]>;
    findOne(id: string): Promise<Rol>;
    create(data: CreateRolDto): Promise<Rol>;
    update(id: string, data: Partial<CreateRolDto>): Promise<Rol>;
    remove(id: string): Promise<void>;
}
