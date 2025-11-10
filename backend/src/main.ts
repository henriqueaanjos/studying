import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://staurora.vercel.app', // libera pro seu front local
    credentials: true, // se estiver usando cookies/sessões
  });
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
