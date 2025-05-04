import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async findAll(): Promise<Role[]> {
        return this.rolesRepository.find({ relations: ['permissions'] });
    }

    async findOne(id: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({
            where: { id },
            relations: ['permissions']
        });

        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }

        return role;
    }

    async findByName(name: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({
            where: { name },
            relations: ['permissions']
        });

        if (!role) {
            throw new NotFoundException(`Role with name ${name} not found`);
        }

        return role;
    }

    async findDefaultRoles(): Promise<Role[]> {
        return this.rolesRepository.find({
            where: { isDefault: true },
            relations: ['permissions']
        });
    }

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const existingRole = await this.rolesRepository.findOne({
            where: { name: createRoleDto.name }
        });

        if (existingRole) {
            throw new ConflictException(`Role with name ${createRoleDto.name} already exists`);
        }

        const role = this.rolesRepository.create(createRoleDto);
        return this.rolesRepository.save(role);
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        const role = await this.findOne(id);

        if (updateRoleDto.name && updateRoleDto.name !== role.name) {
            const existingRole = await this.rolesRepository.findOne({
                where: { name: updateRoleDto.name }
            });

            if (existingRole) {
                throw new ConflictException(`Role with name ${updateRoleDto.name} already exists`);
            }
        }

        Object.assign(role, updateRoleDto);
        return this.rolesRepository.save(role);
    }

    async remove(id: string): Promise<void> {
        const role = await this.findOne(id);
        await this.rolesRepository.remove(role);
    }

    async addPermissionsToRole(roleId: string, permissionIds: string[]): Promise<Role> {
        // Implementation would depend on your PermissionsService
        // This is a placeholder for that functionality
        return null;
    }
}