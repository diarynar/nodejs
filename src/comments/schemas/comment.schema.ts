import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  comment: String,
  authorId: mongoose.Types.ObjectId,
  carId: mongoose.Types.ObjectId,
  commentDate: {
    type: Date,
    default: Date.now,
  },
});
