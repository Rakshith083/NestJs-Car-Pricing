import { CanActivate, ExecutionContext } from '@nestjs/common';
import { constants } from '../lib/utils/constants';
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (request.currentUser) {
            return request.currentUser.role.name == constants.ROLES.ADMIN ? true : false;
        }
        return false;
    }
}