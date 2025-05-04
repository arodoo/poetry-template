import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private permissionsRepository: Repository<Permission>,
    ) { }

    async findAll(): Promise<Permission[]> {
        return this.permissionsRepository.find();
    }

    async findOne(id: string): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne({ where: { id } });

        if (!permission) {
            throw new NotFoundException(`Permission with ID ${id} not found`);
        }

        return permission;
    }

    async findByCode(code: string): Promise<Permission> {
        const permission = await this.permissionsRepository.findOne({ where: { code } });

        if (!permission) {
            throw new NotFoundException(`Permission with code ${code} not found`);
        }

        return permission;
    }

    async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
        const existingPermission = await this.permissionsRepository.findOne({
            where: { code: createPermissionDto.code }
        });

        if (existingPermission) {
            throw new ConflictException(`Permission with code ${createPermissionDto.code} already exists`);
        }

        const permission = this.permissionsRepository.create(createPermissionDto);
        return this.permissionsRepository.save(permission);
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
        const permission = await this.findOne(id);

        if (updatePermissionDto.code && updatePermissionDto.code !== permission.code) {
            const existingPermission = await this.permissionsRepository.findOne({
                where: { code: updatePermissionDto.code }
            });

            if (existingPermission) {
                throw new ConflictException(`Permission with code ${updatePermissionDto.code} already exists`);
            }
        }

        Object.assign(permission, updatePermissionDto);
        return this.permissionsRepository.save(permission);
    }

    async remove(id: string): Promise<void> {
        const permission = await this.findOne(id);
        await this.permissionsRepository.remove(permission);
    }
}