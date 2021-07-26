import { Document } from 'mongoose';
export interface ICar extends Document {
    readonly name: string;
    readonly price: number;
    readonly mark: string;
    readonly description: string;
    readonly cover: string;
    readonly owner: string;
    readonly publicationDate: Date;
}
