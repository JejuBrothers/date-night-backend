import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
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
    const message = `usersService.addPartner() requestUser=${requestUser.username} targetUser=${targetUser.username}`;
    this.logger.log(message);

    this.usersRepository.updateRequestedAt(requestUser.id, 'new');
    this.usersRepository.updateRequestedAt(targetUser.id, 'new');

    const payload = {
      requester: requestUser.id,
      requestee: targetUser.id,
    };
    token.partner_token = this.jwtService.sign(payload);

    return token;
  }

  async updatePartners(
    requester: string,
    requestee: string,
    decision: boolean,
  ): Promise<boolean> {
    const message = `usersService.updatePartners() requestor=${requester} requestee=${requestee} decision=${decision}`;
    this.logger.log(message);
    if (decision) {
      await this.usersRepository.updatePartner(requester, requestee);
      await this.usersRepository.updatePartner(requestee, requester);
      return true;
    }
    await this.usersRepository.updateRequestedAt(requester);
    await this.usersRepository.updateRequestedAt(requestee);
    return false;
  }
}
