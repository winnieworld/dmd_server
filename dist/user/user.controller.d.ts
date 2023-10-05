import { UserService } from "./user.service";
import { AuthDTO } from "../auth/dto/auth-credentials.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(authDTO: AuthDTO.SignUp): Promise<string>;
}
