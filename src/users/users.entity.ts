import {
  Entity,
  Column,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  OneToMany,
  ManyToOne,
  Unique,
  AfterRemove,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Reports } from 'src/reports/reports.entity';
import { BaseModel } from 'src/base-models/base-model';
import { Roles } from 'src/roles/roles.entity';

@Entity()
@Unique(['email',])
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

  // @Column(() => AuditModel)
  // _: AuditModel

  @OneToMany(() => Reports, (report) => report.user,{onDelete:"CASCADE"})
  reports: Reports[];

  @ManyToOne(() => Roles, (role) => role.user)
  role: Roles;

  @AfterInsert()
  logAfterInsert() {
    console.log('User Created with ID : ', this.id);
  }

  @BeforeInsert()
  logBeforeInsert(){
    console.log('Inserting user ',this.email)
  }

  @AfterUpdate()
  async logAfterUpdate() {
    console.log(`user with id ${this.id} is updated`);
  }

  @BeforeRemove()
  async logBeforeDelete() {
    console.log('HI Before delete')
  }

  @AfterRemove()
  async logAfterRemove() {
    console.log('HI After delete')
  }
}