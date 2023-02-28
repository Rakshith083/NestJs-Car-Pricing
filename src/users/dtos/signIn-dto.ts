import { IsBoolean, IsEmail,IsOptional,IsString, Length } from "class-validator";

export class SignInDTO{
    @IsEmail()
    email:string;

    @IsString()
    @Length(5,8)
    password:string;

}
