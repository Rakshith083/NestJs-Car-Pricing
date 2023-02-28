import { Body, ClassSerializerInterceptor, Controller, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        private reportsService: ReportsService
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    createReport(
        @Body() body: CreateReportDTO,
        @Session() session: any
    ) {
        return this.reportsService.createReport(body, session.userId);
    }
}
