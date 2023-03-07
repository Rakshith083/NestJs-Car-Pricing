import { Req } from "@nestjs/common";
import { Exclude } from "class-transformer";
import { RequestContext } from "src/lib/utils/req-ctx";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class AuditModel{
    @CreateDateColumn({name:"created_at"})
    created_at: Date

    @Column({name:"created_by", default: null })
    created_by: string

    @UpdateDateColumn({name:"modified_at"})
    modified_at: Date

    @Column({name:"modified_by", default: null })
    modified_by: string

    @DeleteDateColumn({name:"deleted_at", select: false })
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