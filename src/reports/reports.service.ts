import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-reports.dto';
import { Reports } from './reports.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Reports) private reportsRepository: Repository<Reports>
    ) {
        reportsRepository.remove = reportsRepository.softRemove;
        reportsRepository.delete = reportsRepository.softDelete;
    }
    createReport(body: CreateReportDTO, user: Users) {
        let report = this.reportsRepository.create(body)
        report.user = user;
        return this.reportsRepository.save(report);
    }

    async changeApproval(id: string, is_approved: boolean) {
        let report = await this.reportsRepository.findOne({ where: { id: id } });
        if (!report) {
            throw new NotFoundException('Report not found');
        }

        return this.reportsRepository.save(Object.assign(report, { is_approved: is_approved }));
    }
}
