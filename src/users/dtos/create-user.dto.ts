import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(5, 8)
    password: string;

    @IsString()
    @Length(3, 100)
    name: string

    @IsBoolean()
    @IsOptional()
    sessionActive: boolean

    @IsDate()
    @IsOptional()
    lastLogin: Date

    @IsString()
    @IsOptional()
    roleName: string
}
