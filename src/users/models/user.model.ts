import { Model } from 'objection';
import { UserRoleEnum } from '../enum/user-role.enum';
import { PartnerStatusEnum } from '../enum/partner-status.enum';

export class UserModel extends Model {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
  partner: string;
  status: PartnerStatusEnum;

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
          enum: ['user', 'admin'],
          default: 'user',
        },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
        partner: { type: 'string' },
        status: {
          type: 'partner_status',
          enum: ['single', 'pending', 'taken'],
          default: 'single',
        },
      },
    };
  }

  $formatJson(jsonRaw) {
    const json = super.$formatJson(jsonRaw);
    delete json.password;
    delete json.role;

    return json;
  }
}
