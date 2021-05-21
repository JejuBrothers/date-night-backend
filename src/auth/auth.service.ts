import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserModel } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(@Body() userDto: CreateUserDto): Promise<UserModel> {
    return await this.usersService.create(userDto);
  }
}
