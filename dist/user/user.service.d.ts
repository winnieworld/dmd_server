import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDTO } from '../auth/dto/auth-credentials.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(authDTO: AuthDTO.SignUp): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findByNickname(nickname: string): Promise<UserEntity>;
}
