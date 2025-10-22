import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SysUserModule } from './sysuser/sysuser.module';
import { AuthModule } from './auth/auth.module';
import { ServiciosModule } from './servicios/servicios.module';
import { LogsModule } from './logs/logs.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { Hito } from './Hitos/hitos.entity';
import { RecursosModule } from './recursos/recursos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isPublic = process.env.ENVIRONMENT === 'public';
        const host = isPublic
          ? process.env.DB_HOST_PUBLIC
          : process.env.DB_HOST_PRIVATE;

        return {
          type: 'mysql',
          host,
          port: parseInt(process.env.DB_PORT ?? '3306', 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
        };
      },
    }),
    SysUserModule,
    AuthModule,
    ServiciosModule,
    Hito,
    LogsModule,
    ProyectosModule, // 👈 correcto (plural)
    RecursosModule,
  ],
})
export class AppModule {}
