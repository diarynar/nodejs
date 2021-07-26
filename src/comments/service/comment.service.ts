import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IComment } from '../interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<IComment>) {}
  async createComment(commentDto: any): Promise<IComment> {
    const newComment = new this.commentModel(commentDto);
    return await newComment.save();
  }

  async findCommentById(commentId: string): Promise<IComment> {
    return await this.commentModel.findById(commentId).exec();
  }

  async update(id, commentDto: any): Promise<IComment> {
    return await this.commentModel.findByIdAndUpdate(
      id,
      { ...commentDto },
      { new: true },
    );
  }

  async findAllComment(): Promise<IComment[]> {
    return await this.commentModel.find().exec();
  }
  async deleteComment(id): Promise<any> {
    return await this.commentModel.findByIdAndRemove(id);
  }
}
