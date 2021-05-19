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
}
