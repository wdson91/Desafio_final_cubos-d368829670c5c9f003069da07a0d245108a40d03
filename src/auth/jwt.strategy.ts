import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'wdson', // Substitua pela sua chave secreta
    });
  }

  async validate(payload: any) {

    const user = await this.authService.validateUser(
      payload.email
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.id;
  }
}
