import { Controller, Post, Body } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post('enviar')
  async enviar(
    @Body('email') email: string,
    @Body('asunto') asunto: string,
    @Body('mensaje') mensaje: string,
  ) {
    return this.notificacionesService.enviarCorreo(email, asunto, mensaje);
  }
}
