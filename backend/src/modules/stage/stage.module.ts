import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { PrismaService } from '../../database/PrismaService';;

@Module({
  controllers: [StageController],
  providers: [StageService, PrismaService],
  exports: [StageService],
})
export class StageModule {}
