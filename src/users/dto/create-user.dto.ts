import { PartnerStatusEnum } from '../enum/partner-status.enum';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Username is too short' })
  @MaxLength(16, { message: 'Username is too long' })
  username: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(72, { message: 'Password is too long' })
  password: string;

  partner: string;

  @IsString()
  @IsDefined()
  status: PartnerStatusEnum;
}
