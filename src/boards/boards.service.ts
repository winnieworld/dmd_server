import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Board } from './boards.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class BoardsService {
  // private readonly s3;

  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {
    // AWS.config.update({
    //   region: process.env.AWS_REGION,
    //   credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY,
    //     secretAccessKey: process.env.AWS_SECRET_KEY,
    //   },
    // });
    // this.s3 = new AWS.S3();
  }
  async uploadImage(file: Express.Multer.File) {
    // const key = `${Date.now() + file.originalname}`;
    // const params = {
    //   Bucket: process.env.AWS_BUCKET_NAME,
    //   ACL: 'private',
    //   Key: key,
    //   Body: file.buffer,
    // };
    // return new Promise((resolve, reject) => {
    //   this.s3.putObject(params, (err, data) => {
    //     if (err) reject(err);
    //     resolve(key);
    //   });
    // });
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

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, contents } = createBoardDto;
    const board = await this.boardRepository.create({
      title,
      contents,
    });

    await this.boardRepository.save(board);
    return board;
  }

  //   async getBoardById(id: number): Promise<Board> {
  //     const found = await this.boardRepository.findOne(id);

  //     if (!found) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }

  //     return found;
  //   }

  // async deleteBoard(id: number, user: UserEntity): Promise<void> {
  //   const result = await this.boardRepository.delete({ id, user });

  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  // }

  //   async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
  //     const board = await this.getBoardById(id);

  //     board.status = status;
  //     await this.boardRepository.save(board);

  //     return board;
  //   }
  // }
}
