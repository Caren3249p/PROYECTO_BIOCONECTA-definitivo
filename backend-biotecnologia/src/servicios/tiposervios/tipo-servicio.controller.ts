import { Controller, Get } from '@nestjs/common';
import { TipoServicioService } from './tipo-servicio.service';

@Controller('service-type')
export class TipoServicioController {
  constructor(private readonly tipoServicioService: TipoServicioService) {}

  @Get()
  findAll() {
    return this.tipoServicioService.findAll();
  }
}
