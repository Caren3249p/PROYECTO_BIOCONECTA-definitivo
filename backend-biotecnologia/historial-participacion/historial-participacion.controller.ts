import { 
  Controller, 
  Get, 
  Post, 
  Query, 
  Body, 
  UseGuards, 
  Request,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { HistorialParticipacionService } from './historial-participacion.service';
import { FiltroHistorialDto, CrearHistorialDto } from './dto/historial-participacion.dto';

@Controller('historial-participacion')
@UseGuards(JwtAuthGuard)
export class HistorialParticipacionController {
  constructor(private readonly historialService: HistorialParticipacionService) {}

  @Get()
  async obtenerHistorial(@Query() filtros: FiltroHistorialDto, @Request() req) {
    try {
      // Si no se especifica usuarioId y el usuario no es admin, solo mostrar su historial
      if (!filtros.usuarioId && req.user.rol?.nombre !== 'admin') {
        filtros.usuarioId = req.user.id;
      }

      const resultado = await this.historialService.obtenerHistorial(filtros);
      return {
        success: true,
        data: resultado
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener el historial de participación',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('mi-historial')
  async obtenerMiHistorial(@Query() filtros: FiltroHistorialDto, @Request() req) {
    try {
      // Forzar que solo se muestre el historial del usuario autenticado
      filtros.usuarioId = req.user.id;
      
      const resultado = await this.historialService.obtenerHistorial(filtros);
      return {
        success: true,
        data: resultado
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener tu historial de participación',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('estadisticas')
  async obtenerEstadisticas(
    @Query('usuarioId') usuarioId?: number,
    @Query('fechaInicio') fechaInicio?: string,
    @Query('fechaFin') fechaFin?: string,
    @Request() req?
  ) {
    try {
      // Si no es admin, solo puede ver sus propias estadísticas
      if (req.user.rol?.nombre !== 'admin' && usuarioId && usuarioId !== req.user.id) {
        usuarioId = req.user.id;
      } else if (!usuarioId && req.user.rol?.nombre !== 'admin') {
        usuarioId = req.user.id;
      }

      const estadisticas = await this.historialService.obtenerEstadisticas(
        usuarioId, 
        fechaInicio, 
        fechaFin
      );
      
      return {
        success: true,
        data: estadisticas
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener las estadísticas',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('tipos-participacion')
  async obtenerTiposParticipacion() {
    try {
      const tipos = await this.historialService.obtenerTiposParticipacion();
      return {
        success: true,
        data: tipos
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al obtener los tipos de participación',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async crearRegistro(@Body() datos: CrearHistorialDto, @Request() req) {
    try {
      // Solo admins pueden crear registros para otros usuarios
      if (req.user.rol?.nombre !== 'admin' && datos.usuarioId !== req.user.id) {
        throw new HttpException(
          'No tienes permisos para crear registros para otros usuarios',
          HttpStatus.FORBIDDEN
        );
      }

      const registro = await this.historialService.crearRegistro(datos);
      return {
        success: true,
        data: registro,
        message: 'Registro de participación creado exitosamente'
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al crear el registro de participación',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}