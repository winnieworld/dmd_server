import { Injectable, NotFoundException } from "@nestjs/common";
import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";
import { Repository } from "typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { InjectRepository } from "@nestjs/typeorm";

import { Board } from "./boards.entity";
import { UserEntity } from "../user/user.entity";

dotenv.config(); // .env 파일을 로드

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      const keyName = `${Date.now() + file.originalname}`;
      const upload = await new AWS.S3()
        .putObject({
          Key: keyName,
          Body: file.buffer,
          Bucket: process.env.AWS_S3_BUCKET_NAME,
        })
        .promise();

      return `https://dmdimages.s3.ap-northeast-2.amazonaws.com/${keyName}`;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllBoards(page = 0) {
    const take = 10;

    const [boards, total] = await this.boardRepository.findAndCount({
      take,
      skip: page * take,
    });
    return {
      data: boards,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async createBoard(createBoardDto: CreateBoardDto, imageUrl: string[]) {
    const { title, contents } = createBoardDto;
    const board = await this.boardRepository.create({
      title,
      contents,
      imageUrl: imageUrl.toString(),
    });

    await this.boardRepository.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async deleteBoard(id: number) {
    const found = await this.boardRepository.findOne({ where: { id } });
    const fileKey = found?.imageUrl.substring(
      found?.imageUrl.lastIndexOf("/") + 1
    );
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };
    const upload = await new AWS.S3();

    await upload.deleteObject(deleteParams).promise();

    const result = await this.boardRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
  // async getAllBoards(user: UserEntity): Promise<Board[]> {
  //   const query = this.boardRepository.createQueryBuilder("board");

  //   query.where("board.userId = :userId", { userId: user.id });

  //   const boards = await query.getMany();

  //   return boards;
  // }

  // async createBoard(createBoardDto: CreateBoardDto, user: UserEntity) {
  //   const { title, contents } = createBoardDto;
  //   const board =await this.boardRepository.create({
  //     title,
  //     contents,
  //     status: BoardStatus.PUBLIC,
  //     user
  //   });

  //   await this.boardRepository.save(board);
  //   return board;

  // }
  //   async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
  //     const board = await this.getBoardById(id);

  //     board.status = status;
  //     await this.boardRepository.save(board);

  //     return board;
  //   }
  // }
}
