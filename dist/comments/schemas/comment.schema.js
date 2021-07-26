"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    comment: String,
    authorId: mongoose.Types.ObjectId,
    carId: mongoose.Types.ObjectId,
    commentDate: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=comment.schema.js.map