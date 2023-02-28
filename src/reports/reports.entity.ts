import { BaseModel } from 'src/base-models/base-model.entity';
import { Users } from 'src/users/users.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => Users, (user) => user.reports)
  user: Users;
}