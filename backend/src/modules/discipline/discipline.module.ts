import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, PrismaService],
  exports: [DisciplineService],
})
export class DisciplineModule {}
