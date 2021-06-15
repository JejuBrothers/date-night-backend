import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { PartnerStatusEnum } from './enum/partner-status.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async hashPassword(plainPass: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(plainPass, saltOrRounds);
    const message = `UsersService.hashPassword() hash=${hash} 
    )}`;
    this.logger.log(message);
    return hash;
  }

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersService.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    const hashed = await this.hashPassword(createUserDto.password);
    createUserDto.password = hashed;
    const createdUser = await this.usersRepository.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<UserModel[]> {
    const message = 'UsersService.findAll()';
    this.logger.log(message);
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<UserModel> {
    const message = `UsersService.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersRepository.findOne(id);
  }

  findByUsername(username: string): Promise<UserModel> {
    const message = `UsersService.findByUsername() username=${username}`;
    this.logger.log(message);
    return this.usersRepository.findByUsername(username);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const message = `UsersService.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return this.usersRepository.update(id, updateUserDto);
  }

  updateByUsername(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const message = `UsersService.updateByUsername() username=${username} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return this.usersRepository.updateByUsername(username, updateUserDto);
  }

  delete(id: string): Promise<number> {
    const message = `UsersService.delete() id=${id}`;
    this.logger.log(message);
    return this.usersRepository.delete(id);
  }

  //partner
  async addPartner(requester: string, requestee: string): Promise<any> {
    const token = {
      partner_token: null,
    };
    const requestUser = await this.findByUsername(requester);
    const targetUser = await this.findByUsername(requestee);
    const message = `partnerService.addPartner() requestUser=${requestUser.username} targetUser=${targetUser.username}`;
    this.logger.log(message);

    // if (requestUser.status === PartnerStatusEnum.TAKEN) {
    //   this.logger.error(
    //     `partnerService.addPartner() user already has a partner`,
    //   );
    //   return token;
    // }
    this.logger.log(`times log: ${JSON.stringify(requestUser)}`);

    // 60000 is 1 minute in milliseconds
    // if (
    //   requestUser.status === PartnerStatusEnum.PENDING &&
    //   new Date().getTime() <= requestUser.requestedAt.getTime() + 900 * 60000
    // ) {
    //   this.logger.error(
    //     `partnerService.addPartner() user already has pending request`,
    //   );
    //   return token;
    // }

    //if user can generate partner token
    await this.updateByUsername(requester, {
      partner: null,
      requestedAt: new Date(),
      status: PartnerStatusEnum.PENDING,
    });

    const payload = {
      requester: requestUser.id,
      requestee: targetUser.id,
    };
    token.partner_token = this.jwtService.sign(payload);

    // await this.mailService.sendPartnerRequest(
    //   requester,
    //   requestee,
    //   token.partner_token,
    // );

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
    await this.update(requester, {
      partner: requestee,
      status: PartnerStatusEnum.TAKEN,
    });
    await this.update(requestee, {
      partner: requester,
      status: PartnerStatusEnum.TAKEN,
    });
  }

  async denyPartners(requester: string, requestee: string): Promise<any> {
    const message = `partnerService.denyPartners() requestor=${requester} requestee=${requestee}`;
    this.logger.log(message);
    await this.updateByUsername(requester, {
      status: PartnerStatusEnum.SINGLE,
    });
  }
}
