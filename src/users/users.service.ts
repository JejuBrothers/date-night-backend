import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersService.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<UserModel[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<UserModel> {
    return this.usersRepository.findOne(id);
  }

  update(id: string): Promise<UserModel> {
    return this.usersRepository.update(id);
  }

  delete(id: string): Promise<number> {
    return this.usersRepository.delete(id);
  }
}
