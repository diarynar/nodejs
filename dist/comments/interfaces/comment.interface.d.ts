import { Document } from 'mongoose';
export interface IComment extends Document {
    readonly comment: string;
    readonly authorId: string;
    readonly carId: string;
    readonly commentDate: Date;
}
