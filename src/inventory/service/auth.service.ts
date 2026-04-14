import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);

    const isMatch = await bcrypt.compare(pass, user?.password || '');

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const playload = { sud: user?.id, username: user?.email };

    return {
      acces_token: await this.jwtService.signAsync(playload),
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    };
  }
}
