import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [TopicController],
  providers: [TopicService, PrismaService],
  exports: [TopicService],
})
export class TopicModule {}
