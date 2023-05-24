//за счет scheme опишем коллекцию
import {Schema, model} from "mongoose"

const ItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    leftItems:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name_person:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

export const Items = model('items', ItemsSchema)