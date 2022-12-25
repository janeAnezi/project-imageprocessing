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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const files_1 = require("../utilities/files");
class ImageService {
    /**
     * Handle a file resize request
     * @param req
     * @param res
     */
    static handleImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const absoluteName = yield (0, files_1.buildImage)(req.query.filename, parseInt(req.query.width), parseInt(req.query.height));
                res.sendFile(absoluteName);
            }
            catch (err) {
                res.status(400).send(`Could not resize image`);
            }
        });
    }
}
exports.ImageService = ImageService;
