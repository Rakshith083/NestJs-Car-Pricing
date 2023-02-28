import { Body, ClassSerializerInterceptor, Controller, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        private reportsService: ReportsService,
        private usersService:UsersService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async createReport(
        @Body() body: CreateReportDTO,
        @Session() session: any
    ) {
        const user=await this.usersService.findOne(session.userId);
        return this.reportsService.createReport(body, user);
    }
}
