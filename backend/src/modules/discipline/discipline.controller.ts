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
import { DisciplineService } from './discipline.service';
import { DisciplineDTO } from './discipline.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: DisciplineDTO) {
    return this.disciplineService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.disciplineService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplineService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: DisciplineDTO) {
    return this.disciplineService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineService.remove(id);
  }
}
