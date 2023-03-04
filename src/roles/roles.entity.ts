import { BaseModel } from "src/base-models/base-model.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(['name', 'deleted_at'])
export class Roles extends BaseModel {
    @Column({ nullable: false})
    name: string

    @Column({ nullable: false })
    description: string

    @OneToMany(() => Users, (user) => user.role)
    user: Users[]
}