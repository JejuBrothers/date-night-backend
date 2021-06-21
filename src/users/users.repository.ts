import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

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

  findByUsername(username: string): Promise<UserModel> {
    const message = `UsersRepository.findByUsername() username=${username}`;
    this.logger.log(message);
    return UserModel.query().findOne({ username });
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

  updatePartner(
    id: string,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<UserModel> {
    const message = `UsersRepository.updatePartner() id=${id} updatePartnerDto=${JSON.stringify(
      updatePartnerDto,
    )}`;
    this.logger.log(message);
    return UserModel.query().patchAndFetchById(id, {
      ...updatePartnerDto,
      updatedAt: new Date(),
    });
  }

  delete(id: string): Promise<number> {
    const message = `UsersRepository.delete() id=${id}`;
    this.logger.log(message);
    return UserModel.query().deleteById(id);
  }
}
