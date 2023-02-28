import { IsBoolean, IsEmail,IsOptional,IsString, Length, Matches } from "class-validator";

export class updateUserDTO{
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    @Length(5,8)
    password:string;

    @IsString()
    @IsOptional()
    @Length(3,100)
    name:string

    @IsBoolean()
    @IsOptional()
    isActive:boolean

    @IsString()
    @IsOptional()
    lastLogn:string
}