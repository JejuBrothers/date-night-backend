import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PartnerStatusEnum } from 'src/users/enum/partner-status.enum';

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

    if (requestUser.status === PartnerStatusEnum.TAKEN) {
      this.logger.error(
        `partnerService.addPartner() user already has a partner`,
      );
      return token;
    }
    this.logger.log(`times log: ${JSON.stringify(requestUser)}`);
    // 60000 is 1 minute in milliseconds
    if (
      requestUser.status === PartnerStatusEnum.PENDING &&
      new Date().getTime() <= requestUser.requestedAt.getTime() + 900 * 60000
    ) {
      this.logger.error(
        `partnerService.addPartner() user already has pending request`,
      );
      return token;
    }

    //if user can generate partner token
    await this.usersService.updateByUsername(requester, {
      partner: '',
      requestedAt: new Date(),
      status: PartnerStatusEnum.PENDING,
    });

    const payload = {
      requester: requestUser.username,
      requestee: targetUser.username,
    };
    token.partner_token = this.jwtService.sign(payload);

    return token;
  }

  async updatePartners(
    requester: string,
    requestee: string,
    decision: boolean,
  ): Promise<any> {
    const message = `partnerService.updatePartners() requestor=${requester} requestee=${requestee} decision=${decision}`;
    this.logger.log(message);
    if (decision) {
      return await this.acceptPartners(requester, requestee);
    }
    return await this.denyPartners(requester, requestee);
  }

  async acceptPartners(requester: string, requestee: string): Promise<any> {
    const message = `partnerService.acceptPartners() requestor=${requester} requestee=${requestee}`;
    this.logger.log(message);
    await this.usersService.updateByUsername(requester, {
      partner: requestee,
      status: PartnerStatusEnum.TAKEN,
    });
    await this.usersService.updateByUsername(requestee, {
      partner: requester,
      status: PartnerStatusEnum.TAKEN,
    });
  }

  async denyPartners(requester: string, requestee: string): Promise<any> {
    const message = `partnerService.denyPartners() requestor=${requester} requestee=${requestee}`;
    this.logger.log(message);
    await this.usersService.updateByUsername(requester, {
      status: PartnerStatusEnum.SINGLE,
    });
  }
}
