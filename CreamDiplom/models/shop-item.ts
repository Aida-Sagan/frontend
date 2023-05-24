import { Schema, model } from "mongoose"


//за счет scheme опишем коллекцию
const ItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    leftItems: {
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
    id: {
        type: Number,
        required: true
    }
})


export const Items = model('items', ItemsSchema)
