"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
// Import necessary modules
const bcrypt_1 = __importDefault(require("bcrypt"));
// Hash a password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=passwordUtils.js.map