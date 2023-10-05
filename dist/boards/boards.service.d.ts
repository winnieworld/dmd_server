/// <reference types="multer" />
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './boards.entity';
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
    uploadImage(file: Express.Multer.File): Promise<void>;
    getAllBoards(page?: number): Promise<{
        data: Board[];
        meta: {
            total: number;
            page: number;
            last_page: number;
        };
    }>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
}
