"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
exports.app = (0, express_1.default)();
const port = 8000;
exports.app.get('/api/image', index_1.ImageService.handleImage);
exports.app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
