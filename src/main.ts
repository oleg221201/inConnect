import '~utils/env.utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '~config/index';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { APP_CONFIG } from '~config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  app.setGlobalPrefix('/api');

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

  const {
    port: PORT,
    cors,
    nodeEnv,
  } = configService.get<AppConfig>(APP_CONFIG);

  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('InConnect')
      .setDescription('InConnect app API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
  }

  app.enableCors(cors);

  app.use(helmet());

  await app.listen(PORT, () => {
    Logger.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
