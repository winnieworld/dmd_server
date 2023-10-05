import { IsEmail, IsString, Length, IsBoolean } from 'class-validator';

export namespace AuthDTO {
  export class SignUp {
    @IsEmail()
    email: string;

    @IsString()
    @Length(10, 20)
    password: string;

    @IsString()
    nickname: string;

    @IsString()
    year: string;

    @IsBoolean()
    markettingAgree: boolean;
  }

  export class LoginDTO {
    @IsEmail()
    email: string;

    @IsString()
    @Length(10, 20)
    password: string;
  }
}
