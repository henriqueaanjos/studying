import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ContestController],
  providers: [ContestService, PrismaService],
  exports: [ContestService],
})
export class ContestModule {}
