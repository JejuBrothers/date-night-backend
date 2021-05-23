import {
  Body,
  Controller,
  Logger,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserModel } from '../users/models/user.model';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `AuthController.signup() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<any> {
    const message = `AuthController.login() userObject=${JSON.stringify(
      req.user,
    )}`;
    this.logger.log(message);
    // passport generates user object based on return value of validate in local strat
    return this.authService.login(req.user);
  }
}
