import { Module } from "@nestjs/common";
import * as dotenv from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/user.entity";
import { AuthModule } from "./auth/auth.module";
import { Board } from "./boards/boards.entity";
import { BoardsModule } from "./boards/boards.module";

dotenv.config(); // .env 파일을 로드

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql", //Database 설정
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DBNAME,
      entities: [UserEntity, Board], // Entity 연결
      synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
    }),
    UserModule,
    AuthModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
