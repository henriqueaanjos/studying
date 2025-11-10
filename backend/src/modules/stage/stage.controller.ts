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
import { StageService } from './stage.service';
import { StageDTO } from './stage.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: StageDTO) {
    return this.stageService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.stageService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stageService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: StageDTO) {
    return this.stageService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stageService.remove(id);
  }
}
