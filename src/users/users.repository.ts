import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const message = 'UsersRepository.findAll()';
    this.logger.log(message);
    return UserModel.query();
  }

  findOne(id: string): Promise<UserModel> {
    const message = `UsersRepository.findOne() id=${id}`;
    this.logger.log(message);
    return UserModel.query().findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const message = `UsersRepository.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return UserModel.query().updateAndFetchById(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  delete(id: string): Promise<number> {
    const message = `UsersRepository.delete() id=${id}`;
    this.logger.log(message);
    return UserModel.query().deleteById(id);
  }
}
