"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarSchema = void 0;
const mongoose = require("mongoose");
exports.CarSchema = new mongoose.Schema({
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
//# sourceMappingURL=car.schema.js.map