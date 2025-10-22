import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class CertificadosService {
  async generarCertificado(datos: {
    nombre: string;
    apellido: string;
    actividad: string;
    fecha: string;
  }, res: Response) {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificado-${datos.nombre}-${datos.apellido}.pdf"`);
    doc.pipe(res);
    doc.fontSize(24).text('Certificado de Asistencia', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(16).text(`Se certifica que ${datos.nombre} ${datos.apellido} participó en la actividad:`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`${datos.actividad}`, { align: 'center', underline: true });
    doc.moveDown(2);
    doc.fontSize(14).text(`Fecha: ${datos.fecha}`, { align: 'center' });
    doc.moveDown(4);
    doc.fontSize(12).text('BioConecta', { align: 'center' });
    doc.end();
  }
}
