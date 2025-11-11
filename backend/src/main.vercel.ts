import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import { AppModule } from './app.module';

let cachedApp: express.Express;

export const handler = async (req: Request, res: Response) => {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);
    await app.init();
    cachedApp = expressApp;
  }

  return cachedApp(req, res);
};
