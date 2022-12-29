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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const connect_1 = require("../db/connect");
const bookSearch_1 = require("../db/queries/bookSearch");
const insertBooks_1 = require("../db/inserts/insertBooks");
const getMemberDibs_1 = require("../db/joins/getMemberDibs");
const auth_1 = require("../utils/auth");
const booksRouter = express_1.default.Router();
exports.booksRouter = booksRouter;
// GET
booksRouter.get("/books", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookQuery = req.query;
    // console.log(bookQuery);
    // console.log("hii");
    const sql = (0, bookSearch_1.booksSearch)(bookQuery);
    try {
        const { rows } = yield connect_1.db.query(sql);
        // console.log(rows);
        res.json(rows);
    }
    catch (err) {
        res.json(err);
    }
}));
booksRouter.get("/books/mydibs", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uuid, sort = "ASC" } = req.query;
    const sql = (0, getMemberDibs_1.getMemberDibs)(uuid, sort);
    console.log(sql);
    try {
        const books = yield connect_1.db.query(sql);
        res.status(200).json(books);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// POST
booksRouter.post("/books", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    const sql = (0, insertBooks_1.insertBooks)(bookData);
    try {
        //const result = await db.query(sql);
        //res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
// PATCH
booksRouter.patch("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBookData = req.body;
    //const sql = updateBookData(updatedBookData);
    try {
        //await db.query(sql);
        res.status(200).send();
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
