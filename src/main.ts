import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const frontendUrl = process.env.FRONT;

  if (!frontendUrl) {
    logger.warn(
      'Variável FRONT não definida. Definindo fallback ou aceitando requisições.',
    );
  }

  app.enableCors({
    origin: frontendUrl || '*', // Permite o front de prod ou fallback
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = process.env.PORT ? Number(process.env.PORT) : 3333;
  await app.listen(port, '0.0.0.0');
  logger.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
