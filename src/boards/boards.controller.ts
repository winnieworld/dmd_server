import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

// @UseGuards(AuthGuard())
@Controller('boards')
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(@Query('page') page = 0) {
    this.logger.verbose(`get all boards`);
    return this.boardsService.getAllBoards(page);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10)) // 10은 최대파일개수
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() request: { request: string },
  ) {
    const imgurl: string[] = [];
    // await Promise.all(
    //   files.map(async (file: Express.Multer.File) => {
    //     const key = await this.boardsService.uploadImage(file);
    //     imgurl.push(process.env.AWS_CLOUDFRONT + key);
    //   }),
    // );

    const createBoardDto: CreateBoardDto = JSON.parse(request?.request);
    return this.boardsService.createBoard(createBoardDto);
  }
  // @Get()
  // getAllBoard(@GetUser() user: User): Promise<Board[]> {
  //   this.logger.verbose(`User ${user.username} trying to get all boards`);
  //   return this.boardsService.getAllBoards(user);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto, user: UserEntity): Promise<Board> {
  //   this.logger.verbose(`User ${user.nickname} creating a new board.
  //       Payload: ${JSON.stringify(createBoardDto)} `);
  //   return this.boardsService.createBoard(createBoardDto, user);
  // }

  //   @Get('/:id')
  //   getBoardById(@Param('id') id: number): Promise<Board> {
  //     return this.boardsService.getBoardById(id);
  //   }
  //   deleteBoard(@Param('id') id, @GetUser() user: User): Promise<void> {
  //     return this.boardsService.deleteBoard(id, user);
  //   }

  //   @Patch('/:id/status')
  //   updateBoardStatus(@Param('id', ParseIntPipe) id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
}
