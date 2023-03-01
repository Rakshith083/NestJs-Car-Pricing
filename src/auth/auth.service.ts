import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Roles } from 'src/roles/roles.entity';
import { SignInDTO } from 'src/users/dtos/signIn-dto';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        @InjectRepository(Users)
        private userRepository: Repository<Users>
    ) { }

    async signup(body: any, role: Roles) {
        // See if email is in use
        const users = await this.usersService.find({ email: body.email });
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // Hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the password together
        const hash = (await scrypt(body.password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        body.password = result;
        // Create a new user and save it
        body.role=role;
        const user = await this.usersService.createUser(body);

        // return the user
        return user;
    }

    async signin(body: SignInDTO) {
        const user = await this.userRepository.findOne(
            { where: { "email": body.email }, select: ['id', 'name', 'email', 'password'] }
        );
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(body.password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }
        this.usersService.update(user.id, { sessionActive: true, lastLogin: (new Date) })
        delete user['password'];
        return user;
    }
}
