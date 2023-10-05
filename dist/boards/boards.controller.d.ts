/// <reference types="multer" />
import { Board } from "./boards.entity";
import { BoardsService } from "./boards.service";
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    getAllBoard(page?: number): Promise<{
        data: Board[];
        meta: {
            total: number;
            page: number;
            last_page: number;
        };
    }>;
    uploadFile(files: Express.Multer.File[], request: {
        request: string;
    }): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
}
