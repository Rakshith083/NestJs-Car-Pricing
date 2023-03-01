import { BaseModel } from "src/base-models/base-model.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Roles extends BaseModel {
    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: false })
    description: string
}