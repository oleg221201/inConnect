import '~utils/env.utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '~config/index';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { APP_CONFIG } from '~config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const { port: PORT, cors } = configService.get<AppConfig>(APP_CONFIG);

  app.enableCors(cors);

  app.use(helmet());

  await app.listen(PORT, () => {
    Logger.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
