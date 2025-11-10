import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

let server: Server;

export const handler = async (req, res) => {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    server = app.getHttpAdapter().getInstance();
  }

  return server(req, res);
};
