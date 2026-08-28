import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Leitura realizada APÓS a inicialização do módulo
  const frontendUrl = process.env.FRONT;

  // Trava a aplicação na subida se a variável não existir (Ideal para Produção)
  if (!frontendUrl) {
    throw new Error('FAILSAFE: A variável de ambiente FRONT não foi definida!');
  }

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();