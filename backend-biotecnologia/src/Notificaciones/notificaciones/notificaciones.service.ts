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
}
