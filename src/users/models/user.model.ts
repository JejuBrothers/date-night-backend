import { Model } from 'objection';
import { UserRoleEnum } from '../enum/user-role.enum';

export class UserModel extends Model {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
  partner: string;
  requestedAt: Date;

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
        password: { type: 'string', minLength: 4, maxLength: 72 },
        role: {
          type: 'user_role',
          enum: ['user', 'admin', 'guest'],
          default: 'guest',
        },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
        partner: { type: 'uuid' },
        requestedAt: { type: 'timestamp' },
      },
    };
  }

  $formatJson(jsonRaw) {
    const json = super.$formatJson(jsonRaw);
    delete json.password;
    // delete json.role;

    return json;
  }
}
