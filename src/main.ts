import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const path = require('path');
import * as express from 'express'; // Import express module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = express(); // Create an Express.js instance

  // Configure view engine and views directory
  expressApp.set('view engine', 'ejs');
  expressApp.set('views', path.join(__dirname, 'views')); // Specify the directory containing your views

  // Use Express.js instance in NestJS application
  app.use(expressApp);

  await app.listen(3000);
}
bootstrap();
