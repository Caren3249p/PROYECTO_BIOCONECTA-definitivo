export declare class NotificacionesService {
    private transporter;
    constructor();
    enviarCorreo(destinatario: string, asunto: string, mensaje: string): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
