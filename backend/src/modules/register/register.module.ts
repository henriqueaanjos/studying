import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { PrismaService } from '../../database/PrismaService';;

@Module({
  controllers: [RegisterController],
  providers: [RegisterService, PrismaService],
  exports: [RegisterService],
})
export class RegisterModule {}
