import { CommentsService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/comment.dto';
export declare class CommentController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    addComment(res: any, createCommentDTO: CreateCommentDto, req: any): Promise<any>;
    findAll(res: any): Promise<any>;
    findById(id: any, res: any): Promise<any>;
    updateComment(res: any, id: any, updateCommentDTO: CreateCommentDto): Promise<any>;
    delete(commentId: any, res: any): Promise<any>;
}
