"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
//за счет scheme опишем коллекцию
const mongoose_1 = require("mongoose");
const ItemsSchema = new mongoose_1.Schema({
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
    name_person: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
exports.Items = (0, mongoose_1.model)('items', ItemsSchema);
