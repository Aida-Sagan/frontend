"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
exports.Comments = mongoose_1.default.model('comment', commentSchema);
