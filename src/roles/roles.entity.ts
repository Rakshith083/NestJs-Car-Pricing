import { AuditModel } from "src/base-models/audit-model";
import { BaseModel } from "src/base-models/base-model";
import { Users } from "src/users/users.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";

@Entity()
// @Unique(['name', 'deleted_at'])
export class Roles extends BaseModel {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  description: string

  @Column(() => AuditModel)
  _: AuditModel

  @OneToMany(() => Users, (user) => user.role)
  user: Users[]
}