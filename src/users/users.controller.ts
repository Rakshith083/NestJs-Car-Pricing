import {
    Controller,
    Body,
    Post,
    Get,
    Delete,
    Patch,
    Param,
    Query,
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor,
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { SignInDTO } from './dtos/signIn-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './users.entity';
import { RolesService } from 'src/roles/roles.service';

@Controller('auth')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
        private roleService: RolesService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signUp')
    async userSignUp(@Body() body: CreateUserDTO, @Session() session: any) {
        if (!body.roleName) { body.roleName = 'local' }
        var role = await this.roleService.findRole(body.roleName)
        const user = await this.authService.signup(body, role);
        session.userId = user.id;
        return user;
    }

    @Post('/signIn')
    async userSignIn(@Body() body: SignInDTO, @Session() session: any) {
        const user = await this.authService.signin(body)
        session.userId = user.id;
        return user;
    }

    // @Get('/getLoggedInUser')
    // @UseGuards(AuthGuard)
    // async getLoggedInUser(@Session() session: any) {
    //     if (!session.userId) {
    //         throw new NotFoundException('No active sessions found')
    //     }
    //     return await this.userService.findOne(session.userId);
    // }

    @Get('/getLoggedInUser')
    @UseGuards(AuthGuard)
    async getLoggedInUser(@CurrentUser() user: Users) {
        return user
    }

    @Post('/signOut')
    signOut(@Session() session: any) {
        if (!session.userId) {
            throw new NotFoundException('No active sessions found')
        }
        this.userService.update(session.userId, { "sessionActive": false, "lastLogin": (new Date) });
        session.userId = null;
        return 'Successfully logged out!'
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        let user = await this.userService.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        else return user;
    }

    @Get()
    getUsers(@Query() q: object) {
        return this.userService.find(q);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    @Patch('/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    updateUser(@Param('id') id: string, @Body() body: object) {
        return this.userService.update(id, body)
    }
}
