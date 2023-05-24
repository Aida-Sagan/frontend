import { Schema, model } from "mongoose"

const CommentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    id: Number
})

export const Comment = model('comment', CommentSchema)
