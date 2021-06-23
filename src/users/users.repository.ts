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

  //async await necessary here
  async handlePartnerRequest(requester: UserModel): Promise<UserModel> {
    const message = `UsersRepository.handlePartnerRequest() requester=${JSON.stringify(
      requester,
    )}`;
    this.logger.log(message);
    return await UserModel.query().patchAndFetchById(requester.id, {
      requestedAt: new Date(),
    });
  }

  updatePartner(requesterId: string, requesteeId: string): Promise<UserModel> {
    const message = `UsersRepository.updatePartner() requester=${requesterId} requestee=${requesteeId}`;
    this.logger.log(message);
    return UserModel.query().patchAndFetchById(requesterId, {
      partner: requesteeId,
      updatedAt: new Date(),
    });
  }

  delete(id: string): Promise<number> {
    const message = `UsersRepository.delete() id=${id}`;
    this.logger.log(message);
    return UserModel.query().deleteById(id);
  }
}
