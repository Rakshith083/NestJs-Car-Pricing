import {  NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response, NextFunction } from 'express'
import { RequestContext } from "src/utils/req-ctx";
import { Repository } from "typeorm";
import { Users } from "../users.entity";

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
        private userRepository:Repository<Users>

    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        if (req.session.userId) {
            let user=await this.userRepository.findOne({ "where": { "id": req.session.userId } ,relations:['role']});
            req.currentUser = user;
        }
        RequestContext.currentRequest = req;
        next();
    }

}