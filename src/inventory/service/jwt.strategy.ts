import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sua-chave-secreta-muito-louca',
    });
  }
  async validate(playload: any) {
    return { userId: playload.sub, email: playload.email };
  }
}
