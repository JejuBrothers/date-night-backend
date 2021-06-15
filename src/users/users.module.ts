import { Logger, Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/guards/constants';

@Module({
  imports: [
    MailModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  providers: [Logger, UsersRepository, UsersService],
  controllers: [UsersController],
  // to be used in authservice
  exports: [UsersService],
})
export class UsersModule {}
