import { Controller, Get, Post, Put, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { Documento } from './documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get()
  findAll(): Promise<Documento[]> {
    return this.documentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Documento> {
    return this.documentosService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateDocumentoDto): Promise<Documento> {
    return this.documentosService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() data: UpdateDocumentoDto): Promise<Documento> {
    return this.documentosService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.documentosService.remove(Number(id));
  }
}