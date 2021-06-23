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
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './models/user.model';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleEnum } from './enum/user-role.enum';
import { Public } from 'src/auth/auth.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  @Put()
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  update(
    @Query('id', ParseUUIDPipe) id: string,
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

  //partner endpoints
  @Post('/partner/add')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  sendPartnerRequest(
    @Request() req,
    @Query('target') target: string,
  ): Promise<any> {
    const message = `usersController.sendPartnerRequest() req.user=${JSON.stringify(
      req.user,
    )}`;
    this.logger.log(message);
    return this.usersService.addPartner(req.user.username, target);
  }

  @Get('partner/response')
  @Public()
  acceptRequest(
    @Query('token') token: string,
    @Query('decision') decision: boolean,
  ): Promise<boolean> {
    this.logger.log(`usersController.acceptRequest() token=${token}`);

    const valid = this.jwtService.verify(token);
    this.logger.log(`valid partner token: ${JSON.stringify(valid)}`);
    return this.usersService.updatePartners(
      valid.requester,
      valid.requestee,
      decision,
    );
  }
}
