import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly logger: Logger) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // for jwt-strat, guaranteed we're receiving a valid token
  async validate(payload: any) {
    const message = `JwtStrategy.validate() payload=${JSON.stringify(payload)}`;
    this.logger.log(message);
    return { userId: payload.sub, username: payload.username };
  }
}
