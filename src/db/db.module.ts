import { Module } from '@nestjs/common';

import { ObjectionModule } from '@willsoto/nestjs-objection';
import * as knexfile from '../../knexfile';
import { UserModel } from '../users/models/user.model';

@Module({
  imports: [
    ObjectionModule.register({
      config: knexfile[process.env.NODE_ENV || 'development'],
    }),
    ObjectionModule.forFeature([UserModel]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
