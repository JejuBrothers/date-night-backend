import { Model } from 'objection';
import { UserRoleEnum } from '../enum/user-role.enum';

export class UserModel extends Model {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: UserRoleEnum[];
  createdAt: Date;
  updatedAt: Date;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'uuid' },
        username: { type: 'string', minLength: 4, maxLength: 16 },
        email: { type: 'string' },
        password: { type: 'string', minLength: 4, maxLength: 16 },
        role: {
          type: 'user_role',
          enum: ['user', 'admin'],
          default: 'user',
        },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }
}
