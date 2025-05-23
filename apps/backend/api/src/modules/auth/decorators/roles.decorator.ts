// filepath: d:\zProyectos\NestJS\poetry-template\apps\backend\api\src\modules\auth\decorators\roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);