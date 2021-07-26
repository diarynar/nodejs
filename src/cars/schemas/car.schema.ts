import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  name: String,
  price: Number,
  mark: String,
  description: String,
  cover: String,
  owner: mongoose.Types.ObjectId,
  publicationDate: {
    type: Date,
    default: Date.now,
  },
});
