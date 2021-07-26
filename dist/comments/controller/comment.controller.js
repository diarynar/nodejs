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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const comment_service_1 = require("../service/comment.service");
const comment_dto_1 = require("../dto/comment.dto");
const jwt_auth_guard_1 = require("../../users/guards/jwt-auth.guard");
let CommentController = class CommentController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async addComment(res, createCommentDTO, req) {
        const result = await this.commentsService.createComment(Object.assign(Object.assign({}, createCommentDTO), { authorId: req.user._id }));
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async findAll(res) {
        const comments = await this.commentsService.findAllComment();
        return res.status(common_1.HttpStatus.OK).json(comments);
    }
    async findById(id, res) {
        const result = await this.commentsService.findCommentById(id);
        if (!result)
            throw new common_1.NotFoundException('Id does not exist!');
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async updateComment(res, id, updateCommentDTO) {
        const commentResult = await this.commentsService.update(id, updateCommentDTO);
        return res.status(common_1.HttpStatus.OK).json(commentResult);
    }
    async delete(commentId, res) {
        const result = await this.commentsService.deleteComment(commentId);
        if (!result)
            throw new common_1.NotFoundException('Post does not exist');
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Post has been deleted', result });
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/create'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body(common_2.ValidationPipe)),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addComment", null);
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiParam({ name: 'id', required: true }),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('/:id'),
    swagger_1.ApiParam({ name: 'id', required: true }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body(common_2.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('/:id'),
    swagger_1.ApiParam({ name: 'id', required: true }),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
CommentController = __decorate([
    swagger_1.ApiTags('comments'),
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentsService])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map