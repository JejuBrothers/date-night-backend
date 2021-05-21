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
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersController.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    const message = 'UsersController.findAll()';
    this.logger.log(message);
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }

  @Put(':id')
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
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<number> {
    const message = `UsersController.delete() id=${id}`;
    this.logger.log(message);
    return this.usersService.delete(id);
  }
}
