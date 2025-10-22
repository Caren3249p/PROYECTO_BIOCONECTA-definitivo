import { Controller, Get, Post, Put, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Rol[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rol> {
    return this.rolesService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateRolDto): Promise<Rol> {
    return this.rolesService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() data: Partial<CreateRolDto>): Promise<Rol> {
    return this.rolesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(Number(id));
  }
}