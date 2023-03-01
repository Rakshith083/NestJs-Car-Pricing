import { CallHandler } from "@nestjs/common/interfaces";
import { NestInterceptor } from "@nestjs/common/interfaces";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../users.entity";
import { Repository } from "typeorm";

export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>
        ) { }
    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        if (request.session.userId) {
            const user = await this.userRepository.findOne({ "where": { "id": request.session.userId } ,relations:['role']});//await this.userRepository.findOne({where:{id:request.session.userId}})//this.userService.findOne();
            request.currentUser = user;
        }
        return handler.handle()
    }
}
