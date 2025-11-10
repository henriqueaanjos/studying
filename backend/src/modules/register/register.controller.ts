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
import { RegisterService } from './register.service';
import { RegisterDTO } from './register.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: RegisterDTO) {
    return this.registerService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.registerService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: RegisterDTO) {
    return this.registerService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(id);
  }
}
