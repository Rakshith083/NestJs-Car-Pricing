import {  NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response, NextFunction } from 'express'
import { Users } from "../users.entity";
import { UsersService } from "../users.service";

declare global {
    namespace Express{
        interface Request{
            currentUser?:Users
        }
    }
}

export class CurrentUserMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(Users) 
        private userService:UsersService

    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        if (req.session.userId) {
            const user = await this.userService.findOne(req.session.userId);
            req.currentUser = user;
        }
        next();
    }

}