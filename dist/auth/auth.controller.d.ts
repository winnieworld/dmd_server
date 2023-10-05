import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto/auth-credentials.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDTO: AuthDTO.LoginDTO): Promise<any>;
}
