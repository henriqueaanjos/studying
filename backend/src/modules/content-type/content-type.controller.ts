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
import { ContentTypeService } from './content-type.service';
import { ContentTypeDTO } from './content-type.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('content-type')
export class ContentTypeController {
  constructor(private readonly contentTypeService: ContentTypeService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: ContentTypeDTO) {
    return this.contentTypeService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.contentTypeService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentTypeService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ContentTypeDTO) {
    return this.contentTypeService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentTypeService.remove(id);
  }
}
