import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestDTO } from './contest.dto';
import { AuthGuard, RequestWithUser } from '../auth/auth.guard';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: ContestDTO, @Req() req: RequestWithUser) {
    console.log('UserID:', req.user);
    return this.contestService.create(data, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.contestService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: ContestDTO) {
    return this.contestService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestService.remove(id);
  }
}
