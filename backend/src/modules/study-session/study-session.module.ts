import { Module } from '@nestjs/common';
import { StudySessionService } from './study-session.service';
import { StudySessionController } from './study-session.controller';
import { PrismaService } from '../../database/PrismaService';;

@Module({
  controllers: [StudySessionController],
  providers: [StudySessionService, PrismaService],
  exports: [StudySessionService],
})
export class StudySessionModule {}
