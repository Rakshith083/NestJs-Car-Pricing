import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { CreateRoleDTO } from './dtos/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private rolesService: RolesService
    ) { }
    
    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    createRole(@Body() body: CreateRoleDTO) {
        return this.rolesService.createRole(body);
    }

    @Get()
    getAllRoles() {
        return this.rolesService.listRoles();
    }
    
    @Get('/:name')
    findRoleByName(@Param('name') name: string){
        return this.rolesService.findRole(name)
    }

}
