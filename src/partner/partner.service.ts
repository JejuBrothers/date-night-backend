import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PartnerService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async addPartner(requester: string, requestee: string): Promise<any> {
    const token = {
      partner_token: null,
    };
    const requestUser = await this.usersService.findByUsername(requester);
    const targetUser = await this.usersService.findByUsername(requestee);
    const message = `partnerService.addPartner() requestUser=${requestUser.username} targetUser=${targetUser.username}`;
    this.logger.log(message);
    if (targetUser) {
      const payload = {
        requester: requestUser.username,
        requestee: targetUser.username,
      };
      token.partner_token = this.jwtService.sign(payload);
    }
    return token;
  }
}
