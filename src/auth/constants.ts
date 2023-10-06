import * as dotenv from "dotenv";

dotenv.config(); // .env 파일을 로드

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
