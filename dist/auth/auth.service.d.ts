import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthDTO } from "./dto/auth-credentials.dto";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginDTO: AuthDTO.LoginDTO): Promise<any>;
}
