import { AuditModel } from 'src/base-models/audit-model';
import { BaseModel } from 'src/base-models/base-model';
import { Users } from 'src/users/users.entity';
import { Entity, Column, ManyToOne, } from 'typeorm';

@Entity()
export class Reports extends BaseModel {

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  @Column({ default: false })
  is_approved: boolean;

  @ManyToOne(() => Users, (user) => user.reports)
  user: Users;
}