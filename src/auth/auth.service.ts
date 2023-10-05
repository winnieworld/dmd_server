import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { AuthDTO } from "./dto/auth-credentials.dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDTO: AuthDTO.LoginDTO): Promise<any> {
    const { email, password } = loginDTO;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("존재하지 않는 ID 입니다.");
    }
    const isValidatePassword: boolean = await bcrypt.compare(
      password,
      user.password
    );
    if (!isValidatePassword) {
      throw new UnauthorizedException("비밀번호를 확인해주세요");
    }
    if (user && isValidatePassword) {
      const { password, ...result } = user;
      const payload = { email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else return null;
  }
}
