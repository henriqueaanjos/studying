import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonDTO } from './lesson.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: LessonDTO) {
    console.log(data);
    return this.lessonService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: LessonDTO) {
    return this.lessonService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
