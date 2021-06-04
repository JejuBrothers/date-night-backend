import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from '../../users/enum/user-role.enum';
import { ROLES_KEY } from '../roles.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    const message = `RolesGuard.canActivate() requiredRoles=${JSON.stringify(
      requiredRoles,
    )}`;
    this.logger.log(message);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    this.logger.log(`${JSON.stringify(user)}`);
    const { role } = await this.authService.findOne(user.userId);

    return requiredRoles.some((requiredRole) => {
      return requiredRole === role;
    });
  }
}
