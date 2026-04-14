// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './inventory/service/auth.service';
import { JwtStrategy } from './inventory/service/jwt.strategy';
import { AuthController } from './inventory/controller/auth.controller';
import { UsersModule } from './inventory/modules';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'sua-chave-secreta-muito-louca',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
