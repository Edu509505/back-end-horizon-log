// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './inventory/service/auth.service';
import { JwtStrategy } from './inventory/service/jwt.strategy';
import { AuthController } from './inventory/controller/auth.controller';
import { UsersModule } from './inventory/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.KEY_CRIP,
      signOptions: { expiresIn: '1d' },
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importante: importa o ConfigModule aqui dentro também
      inject: [ConfigService], // Injeta o serviço que gerencia o .env
      useFactory: async (config: ConfigService) => ({
        // O .get() é muito mais seguro que o process.env direto
        secret: config.get<string>('KEY_CRIP'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
