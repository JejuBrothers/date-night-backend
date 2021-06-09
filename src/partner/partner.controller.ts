import {
  Controller,
  Logger,
  Post,
  Query,
  Request,
  Param,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleEnum } from 'src/users/enum/user-role.enum';
import { PartnerService } from './partner.service';
import { UserModel } from '../users/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/auth/auth.decorator';

@Controller('partner')
export class PartnerController {
  constructor(
    private readonly logger: Logger,
    private readonly partnerService: PartnerService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('add')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  async sendPartnerRequest(@Request() req, @Query('target') target: string) {
    const message = `partnerController.sendPartnerRequest() req.user=${JSON.stringify(
      req.user,
    )}`;
    this.logger.log(message);
    return await this.partnerService.addPartner(req.user.username, target);
  }

  @Post('accept')
  @Public()
  async acceptRequest(@Query('token') token: string) {
    this.logger.log(`partnerController.accept() id=${token}`);

    try {
      const valid = await this.jwtService.verify(token);
      this.logger.log(`valid partner token: ${JSON.stringify(valid)}`);
    } catch (error) {
      this.logger.error(`error verifying token: ${error}`);
    }
  }
}
