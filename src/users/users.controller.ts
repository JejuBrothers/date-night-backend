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

  @Put('id/:id')
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

  @Put('username/:username')
  @Roles([UserRoleEnum.ADMIN, UserRoleEnum.USER])
  updateByUsername(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const message = `UsersController.updateByUsername() username=${username} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.updateByUsername(username, updateUserDto);
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
  async sendPartnerRequest(@Request() req, @Query('target') target: string) {
    const message = `partnerController.sendPartnerRequest() req.user=${JSON.stringify(
      req.user,
    )}`;
    this.logger.log(message);
    return await this.usersService.addPartner(req.user.username, target);
  }

  @Get('response')
  @Public()
  async acceptRequest(
    @Query('token') token: string,
    @Query('decision') decision: boolean,
  ) {
    this.logger.log(`partnerController.accept() token=${token}`);

    try {
      const valid = await this.jwtService.verify(token);
      this.logger.log(`valid partner token: ${JSON.stringify(valid)}`);
      this.usersService.updatePartners(
        valid.requester,
        valid.requestee,
        decision,
      );
    } catch (error) {
      this.logger.error(`error verifying token: ${error}`);
    }
  }
}
