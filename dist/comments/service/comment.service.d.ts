import { Model } from 'mongoose';
import { IComment } from '../interfaces/comment.interface';
export declare class CommentsService {
    private commentModel;
    constructor(commentModel: Model<IComment>);
    createComment(commentDto: any): Promise<IComment>;
    findCommentById(commentId: string): Promise<IComment>;
    update(id: any, commentDto: any): Promise<IComment>;
    findAllComment(): Promise<IComment[]>;
    deleteComment(id: any): Promise<any>;
}
