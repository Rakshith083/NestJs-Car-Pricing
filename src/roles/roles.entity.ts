import { BaseModel } from "src/base-models/base-model.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Roles extends BaseModel {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: false })
    description: string

    @OneToMany(() => Users, (user) => user.role)
    user: Users[]
}