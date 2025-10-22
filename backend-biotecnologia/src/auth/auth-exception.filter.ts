import { ExceptionFilter, Catch, UnauthorizedException, ArgumentsHost } from '@nestjs/common';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(401).json({
      statusCode: 401,
      message: 'No autorizado. Verifica tus credenciales o permisos.',
    });
  }
}