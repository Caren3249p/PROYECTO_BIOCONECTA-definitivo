import { Module } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { RecursosController } from './recursos.controller';

@Module({
  providers: [RecursosService],
  controllers: [RecursosController],
})
export class RecursosModule {}
