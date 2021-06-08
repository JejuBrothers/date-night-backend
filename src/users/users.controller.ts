import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleEnum } from './enum/user-role.enum';
import { Public } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Roles([UserRoleEnum.ADMIN])
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersController.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  @Roles([UserRoleEnum.ADMIN])
  findAll(): Promise<UserModel[]> {
    const message = 'UsersController.findAll()';
    this.logger.log(message);
    return this.usersService.findAll();
  }

  @Get()
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  findByUsername(@Query('username') username: string): Promise<UserModel> {
    const message = `UsersController.findByUsername() username=${username}`;
    this.logger.log(message);
    return this.usersService.findByUsername(username);
  }

  @Get(':id')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const message = `UsersController.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<number> {
    const message = `UsersController.delete() id=${id}`;
    this.logger.log(message);
    return this.usersService.delete(id);
  }
}
