"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const shop_item_1 = require("./models/shop-item");
const order_1 = require("../models/order");
const comments_1 = require("./models/comments");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.MONGO).then(() => {
    console.log('Мы подключились');
}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/:universalURL", (req, res) => {
    res.send("SOMETHING");
});
//отслеживаем адрес и на клиентской стороне получаем ответ
app.get('/api/cream-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItems = yield shop_item_1.Items.find().sort({ _id: 1 });
        if (!getItems)
            throw new Error("не найдены товары");
        res.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get('/api/cream-items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItem = yield shop_item_1.Items.findOne({ id: req.params.id });
        console.log(getItem);
        if (!getItem)
            throw new Error("не найдены товары");
        res.status(200).send(getItem);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
//отслеживание юрл адреса на стороне сервера
app.post('/api/cream-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_1.Order.insertMany(req.body);
        if (!result)
            throw new Error("товары не добавлены");
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
// Маршрут для создания комментария
/*app.post('/api/comments', async (req, res) => {
    try {
        const { name, comment } = req.body;

        // Create a new comment document
        const newComment = new Comment({ name, comment });

        // Save the comment to the database
        await newComment.save();

        res.status(200).send(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});*/
// Маршрут для получения всех комментариев
app.get('/api/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItems = yield comments_1.Comments.find().sort({ _id: 1 });
        console.log(getItems);
        if (!getItems)
            throw new Error('Не найдены комменты');
        res.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.listen(config_1.PORT, () => console.log('сервер запущен'));
