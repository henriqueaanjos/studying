import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { StudySessionService } from './study-session.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('study-session')
export class StudySessionController {
  constructor(private readonly studySessionService: StudySessionService) {}

  @UseGuards(AuthGuard)
  @Get(':id/session')
  generateSession(@Param('id') id: string) {
    return this.studySessionService.generateSession(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/plan')
  generateStudyPlan(@Param('id') id: string) {
    return this.studySessionService.generateStudyPlan(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id/by-date')
  getContentsByDate(@Param('id') id: string, @Query('date') date: string) {
    return this.studySessionService.getContentsByDate(id, new Date(date));
  }
}
