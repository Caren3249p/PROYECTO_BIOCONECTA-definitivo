import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysUser } from '../entities/sysuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysUser])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
