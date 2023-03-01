import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles) private rolesRepository: Repository<Roles>
    ) { }
    createRole(body: CreateRoleDTO) {
        var role = this.rolesRepository.create(body);
        return this.rolesRepository.save(role);
    }

    listRoles() {
        return this.rolesRepository.find();
    }

    findRole(name: string) {
        var role = this.rolesRepository.findOne({ where: { name: name } })
        if (!role) {
            throw new NotFoundException('No role found with name ' + name)
        }
        return role;
    }

}
