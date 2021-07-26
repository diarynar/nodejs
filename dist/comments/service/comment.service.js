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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CommentsService = class CommentsService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async createComment(commentDto) {
        const newComment = new this.commentModel(commentDto);
        return await newComment.save();
    }
    async findCommentById(commentId) {
        return await this.commentModel.findById(commentId).exec();
    }
    async update(id, commentDto) {
        return await this.commentModel.findByIdAndUpdate(id, Object.assign({}, commentDto), { new: true });
    }
    async findAllComment() {
        return await this.commentModel.find().exec();
    }
    async deleteComment(id) {
        return await this.commentModel.findByIdAndRemove(id);
    }
};
CommentsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Comment')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comment.service.js.map