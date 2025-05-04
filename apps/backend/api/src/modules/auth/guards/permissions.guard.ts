// filepath: d:\zProyectos\NestJS\poetry-template\apps\backend\api\src\modules\auth\guards\permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) {
      return true; // No permissions required, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false; // No user in request (unauthenticated)
    }

    return requiredPermissions.some(permission => user.hasPermission(permission));
  }
}