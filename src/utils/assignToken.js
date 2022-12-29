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
exports.assignToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("../db/connect");
const updateMember_1 = require("../db/updates/updateMember");
/**
 * Assigns a token to member corresponding to the uuid and returns the token for future requests
 * @param uuid
 * @returns token after assigning it to the member
 */
function assignToken(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield genToken(uuid);
        const sql = (0, updateMember_1.updateMember)({ uuid }, { token });
        if (sql)
            yield connect_1.db.query(sql);
        return token;
    });
}
exports.assignToken = assignToken;
/**
 * A promise wrapper for the synchronus jwt.sign function
 * @param uuid payload
 * @returns generated token
 */
function genToken(uuid) {
    return new Promise(function (resolve, reject) {
        resolve(jsonwebtoken_1.default.sign({ uuid }, process.env.JWT_SECRET));
    });
}
