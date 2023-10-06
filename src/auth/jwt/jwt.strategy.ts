import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/user/user.entity";
import { Repository } from "typeorm";
import { jwtConstants } from "../constants";
import { Payload } from "./jwt.payload"; // 다음에서 곧장 생성할 예정

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super({
      // 헤더 Authentication 에서 Bearer 토큰으로부터 jwt를 추출하겠다는 의미
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret, // jwt 생성시 비밀키로 사용할 텍스트 (노출 X)
      ignoreExpiration: false, // jwt 만료를 무시할 것인지 (기본값: false)
    });
  }

  async validate(payload: Payload) {
    const { email } = payload;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      return user; // request.user에 해당 내용을 넣어준다 (Passport 라이브러리가 해줌)
    } else {
      throw new UnauthorizedException("접근 오류");
    }
  }
}
