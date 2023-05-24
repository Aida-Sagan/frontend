"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO = void 0;
//здесь прописываем константы
exports.MONGO = 'mongodb://127.0.0.1:27017/shopCream?directConnection=true&serverSelectionTimeoutMS=2000';
exports.PORT = process.env.PORT || 7000;
