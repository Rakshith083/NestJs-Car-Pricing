import { Body, ClassSerializerInterceptor, Controller, Param, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        private reportsService: ReportsService,
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async createReport(
        @Body() body: CreateReportDTO,
        @CurrentUser() user:Users
    ) {
        return this.reportsService.createReport(body, user);
    }

    @Patch('/approve/:id')
    // @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    approveReports(
        @Body('is_approved') is_approved:any,
        @Param('id') id:string
    ){
        return this.reportsService.changeApproval(id,is_approved);
    }
}
