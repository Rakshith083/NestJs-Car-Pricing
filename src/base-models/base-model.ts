import { BeforeRemove, BeforeSoftRemove, Column, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: false, select: false })
    isDeleted: boolean

    @BeforeRemove()
    beforeDeleteHook() {
        console.log('Inside before delete hook Base model')
        this.isDeleted = true
    }
}