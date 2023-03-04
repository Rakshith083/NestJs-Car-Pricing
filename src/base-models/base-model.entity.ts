import { Req } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { RequestContext } from "src/utils/req-ctx";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created_at: Date

    @Column({ default: null })
    created_by: string

    @UpdateDateColumn()
    modified_at: Date

    @Column({ default: null })
    modified_by: string

    @DeleteDateColumn({ select: false })
    @Exclude()
    deleted_at: Date

    @BeforeInsert()
    setAuditsBeforeInsert(@Req() req: any) {
        console.log(RequestContext.currentRequest)
        if (RequestContext.currentRequest.currentUser) {
            this.created_by=this.modified_by = RequestContext.currentRequest.currentUser.name
        }
    }

    @BeforeUpdate()
    setAuditsBeforeUpdate(@Req() req: any) {
        if (RequestContext.currentRequest.currentUser) {
            this.modified_by = RequestContext.currentRequest.currentUser.name
        }
    }
}