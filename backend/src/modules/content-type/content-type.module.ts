import { Module } from '@nestjs/common';
import { ContentTypeService } from './content-type.service';
import { ContentTypeController } from './content-type.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ContentTypeController],
  providers: [ContentTypeService, PrismaService],
  exports: [ContentTypeService],
})
export class ContentTypeModule {}
