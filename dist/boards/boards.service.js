"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const boards_entity_1 = require("./boards.entity");
dotenv.config();
let BoardsService = exports.BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
        AWS.config.update({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
    }
    async uploadImage(file) {
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
        }
        catch (error) {
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
    async createBoard(createBoardDto, imageUrl) {
        const { title, contents } = createBoardDto;
        const board = await this.boardRepository.create({
            title,
            contents,
            imageUrl: imageUrl.toString(),
        });
        await this.boardRepository.save(board);
        return board;
    }
    async getBoardById(id) {
        const found = await this.boardRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async deleteBoard(id) {
        const found = await this.boardRepository.findOne({ where: { id } });
        const fileKey = found?.imageUrl.substring(found?.imageUrl.lastIndexOf("/") + 1);
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
        };
        const upload = await new AWS.S3();
        await upload.deleteObject(deleteParams).promise();
        const result = await this.boardRepository.delete({ id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
    }
};
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(boards_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BoardsService);
//# sourceMappingURL=boards.service.js.map