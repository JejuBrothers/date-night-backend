import { Logger, Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [Logger, UsersRepository, UsersService],
  controllers: [UsersController],
  // to be used in authservice
  exports: [UsersService],
})
export class UsersModule {}
