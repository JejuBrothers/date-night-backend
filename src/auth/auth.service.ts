import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  signup(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `AuthService.signup() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.create(createUserDto);
  }
}
