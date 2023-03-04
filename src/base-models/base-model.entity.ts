import { Req } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseModel{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @CreateDateColumn()
    created_at:Date

    @Column({default:null})
    created_by:string

    @UpdateDateColumn()
    modified_at:Date

    @Column({default:null})
    modified_by:string

    @DeleteDateColumn({select:false})
    @Exclude()
    deleted_at:Date

    @BeforeInsert()
    setAuditsBeforeInsert(@Req() req:any){
        this.created_by=req.currentUser.id;
        this.modified_by=req.currentUser.id;
    }

    @BeforeUpdate()
    setAuditsBeforeUpdate(@Req() req:any){
        this.modified_by=req.currentUser.id;
    }
}