import {
  Entity,
  Column,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  OneToMany,
  ManyToOne,
  Unique
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Reports } from 'src/reports/reports.entity';
import { BaseModel } from 'src/base-models/base-model.entity';
import { Roles } from 'src/roles/roles.entity';

@Entity()
@Unique(['email', 'deleted_at'])
export class Users extends BaseModel {

  @Column()
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  lastLogin: Date

  @OneToMany(() => Reports, (report) => report.user)
  reports: Reports[];

  @ManyToOne(() => Roles, (role) => role.user)
  role: Roles;

  @AfterInsert()
  logAfterInsert() {
    console.log('User Created with ID : ', this.id);
  }

  // @BeforeInsert()
  // logBeforeInsert(){
  //   console.log('Inserting user ',this.email)
  // }

  @AfterUpdate()
  logAfterUpdate() {
    console.log(`user with id ${this.id} is updated`);
  }

  @BeforeRemove()
  logBeforeDelete() {
    console.log(`deleting user with id ${this.id}`);
  }
}