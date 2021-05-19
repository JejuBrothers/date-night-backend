import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersRepository {
  constructor(private readonly logger: Logger) {}

  create(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersRepository.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return UserModel.query().insert(createUserDto).returning('*');
  }
}
