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

  findAll(): Promise<UserModel[]> {
    return UserModel.query();
  }

  findOne(id: string): Promise<UserModel> {
    return UserModel.query().findById(id);
  }

  delete(id: string): Promise<number> {
    return UserModel.query().deleteById(id);
  }

  // pass in update object?
  update(id: string): Promise<UserModel> {
    return UserModel.query().updateAndFetchById(id, {});
  }
}
