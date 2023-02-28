import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ReportsController } from './reports.controller';
import { Reports } from './reports.entity';
import { ReportsService } from './reports.service';

@Module({
  imports:[TypeOrmModule.forFeature([Reports]),UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
