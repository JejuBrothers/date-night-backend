import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(@Body() userDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(userDto);
  }
}
