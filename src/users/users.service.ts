import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
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
}
