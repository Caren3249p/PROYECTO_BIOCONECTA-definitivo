import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificacionesService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  /**
   * Enviar un correo electrónico
   */
  async enviarCorreo(destinatario: string, asunto: string, mensaje: string) {
    try {
      await this.transporter.sendMail({
        from: `"BioTec Reservas" <${process.env.EMAIL_USER}>`,
        to: destinatario,
        subject: asunto,
        html: `<p>${mensaje}</p>`,
      });
      return { success: true, message: 'Correo enviado correctamente' };
    } catch (error) {
      return { success: false, message: 'Error enviando correo', error };
    }
  }

  /**
   * Crear una notificación interna (para usar desde reservas.service.ts)
   */
  async crearNotificacion(data: { idUsuario: number; tipo: string; mensaje: string }) {
    // 🔹 Si en el futuro tienes repositorio de notificaciones, aquí se guardará en DB.
    console.log('📩 Notificación registrada:', {
      idUsuario: data.idUsuario,
      tipo: data.tipo,
      mensaje: data.mensaje,
    });

    // 🔹 Además, puedes aprovechar para enviar el correo directamente:
    const correo = process.env.EMAIL_USER ?? 'biotecreservas@gmail.com';
    await this.enviarCorreo(
      correo,
      `Nueva notificación (${data.tipo})`,
      data.mensaje,
    );

    return { success: true, message: 'Notificación enviada' };
  }
}
