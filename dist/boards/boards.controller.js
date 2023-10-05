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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const boards_service_1 = require("./boards.service");
let BoardsController = exports.BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
        this.logger = new common_1.Logger("Boards");
    }
    getAllBoard(page = 0) {
        this.logger.verbose(`get all boards`);
        return this.boardsService.getAllBoards(page);
    }
    async uploadFile(files, request) {
        const imgurl = [];
        await Promise.all(files.map(async (file) => {
            const key = await this.boardsService.uploadImage(file);
            imgurl.push(key);
        }));
        const createBoardDto = JSON.parse(request?.request);
        return this.boardsService.createBoard(createBoardDto, imgurl);
    }
    getBoardById(id) {
        return this.boardsService.getBoardById(id);
    }
    deleteBoard(id) {
        return this.boardsService.deleteBoard(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getAllBoard", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files", 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getBoardById", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "deleteBoard", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)("boards"),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map