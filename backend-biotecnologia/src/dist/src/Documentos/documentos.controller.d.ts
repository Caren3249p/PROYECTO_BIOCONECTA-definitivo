import { DocumentosService } from './documentos.service';
import { Documento } from './documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
export declare class DocumentosController {
    private readonly documentosService;
    constructor(documentosService: DocumentosService);
    findAll(): Promise<Documento[]>;
    findOne(id: string): Promise<Documento>;
    create(data: CreateDocumentoDto): Promise<Documento>;
    update(id: string, data: UpdateDocumentoDto): Promise<Documento>;
    remove(id: string): Promise<void>;
}
