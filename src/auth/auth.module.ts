import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { LocalStrategy } from "./jwt/jwt.strategy";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt", session: false }), // 기본 passport 설정
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
