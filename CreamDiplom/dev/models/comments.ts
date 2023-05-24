import {Schema, model} from "mongoose"

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

export const Comments = model('comments', commentSchema)
