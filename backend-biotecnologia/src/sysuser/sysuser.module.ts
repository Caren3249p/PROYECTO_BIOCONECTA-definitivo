import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './sysuser.entity';
import { UserService } from './sysuser.service';
import { SysUserController } from './sysuser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [SysUserController],
  exports: [UserService],
})
export class SysUserModule {}
