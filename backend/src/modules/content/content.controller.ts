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
import { ContentService } from './content.service';
import { ContentDTO } from './content.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Post('/mores')
  createContents(@Body() data: ContentDTO[]) {
    console.log(data);
    return this.contentService.createContents(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: ContentDTO) {
    console.log(data);
    return this.contentService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ContentDTO) {
    return this.contentService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(id);
  }
}
