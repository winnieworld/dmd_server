import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserEntity } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth-credentials.dto";
import { GetUser } from "./get-user.decorator";
import { LocalAuthGuard } from "./jwt/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDTO: AuthDTO.LoginDTO): Promise<any> {
    return this.authService.login(loginDTO);
  }
}
