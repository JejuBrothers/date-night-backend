import {
  IsDefined,
  IsEmail,
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
  @MaxLength(16, { message: 'Password is too long' })
  password: string;
}
