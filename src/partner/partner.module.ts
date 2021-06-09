import { Module, Logger } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/guards/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '900s' },
    }),
  ],
  providers: [PartnerService, Logger],
  controllers: [PartnerController],
})
export class PartnerModule {}
