import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersRepository {
  create(createUserDto: CreateUserDto): Promise<UserModel> {
    return UserModel.query().insert(createUserDto).returning('*');
  }
}
