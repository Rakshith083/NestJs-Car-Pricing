import {
  Entity,
  Column,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  BeforeRemove,
  OneToMany
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Reports } from 'src/reports/reports.entity';
import { BaseModel } from 'src/base-models/base-model.entity';

@Entity()
export class Users extends BaseModel {

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({default:false})
  sessionActive:boolean

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  lastLogin:Date

  @OneToMany(()=>Reports,(report)=>report.user)
  reports:Reports[];

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
  logBeforeDelete(){
    console.log(`deleting user with id ${this.id}`);
  }
}