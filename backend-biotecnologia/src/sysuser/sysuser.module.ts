import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sysuser.entity';
import { UserService } from './sysuser.service';
import { SysUserController } from './sysuser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SysUserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // 👈 Muy importante
})
export class SysUserModule {}
