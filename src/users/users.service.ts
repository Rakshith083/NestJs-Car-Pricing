import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>
    ) {
        userRepository.remove = userRepository.softRemove;
        userRepository.delete = userRepository.softDelete;
    }
    createUser(body: object) {
        const instance = this.userRepository.create(body);
        return this.userRepository.save(instance);
    }

    find(query: object) {
        return this.userRepository.find({ "where": query })
    }

    async findOne(id: any) {
        if (!id) {
            throw new BadRequestException('Id not found')
        }
        let user = await this.userRepository.findOne({ "where": { "id": id }, relations: ['role'] });
        return user;

    }

    async update(id: string, record: Partial<Users>) {
        var user = await this.findOne(id);
        if (!user) {
            return new NotFoundException('User Not Found');
        }
        return this.userRepository.save(Object.assign(user, record));
    }

    async delete(id: string) {
        var user = await this.findOne(id);
        if (!user || user === null) {
            throw new NotFoundException('User Not Found');
        }
        else {
            this.userRepository.remove(user)
            return "Successfully deleted"
        }
    }
}
