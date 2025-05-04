import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RolesService } from './roles.service';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  providers: [UsersService, RolesService, PermissionsService],
  exports: [UsersService, RolesService, PermissionsService],
})
export class UsersModule { }