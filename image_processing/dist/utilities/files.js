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
exports.buildImage = exports.transformedFileExists = void 0;
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
/**
 * Get file details like name, extension and full name
 * @param path
 * @param filename
 */
function findFileDetails(path, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir(`${path}/images/full`);
        if (files.length < 1)
            throw new Error(`could not find file ${filename} in directory`);
        const file = files
            .filter((entry) => entry.includes(filename))
            .reduce((element) => element);
        return {
            fullName: file,
            filename: filename,
            extension: path_1.default.extname(file),
        };
    });
}
function transformedFileExists(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { path } = app_root_path_1.default;
            const details = yield findFileDetails(path, filename);
            const metadata = yield (0, sharp_1.default)(`${path}/images/thumb/${details.filename}-${width}-${height}${details.extension}`).metadata();
            return metadata.width === width && metadata.height === height;
        }
        catch (err) {
            return false;
        }
    });
}
exports.transformedFileExists = transformedFileExists;
/**
 * Build a resize
 * @param filename
 * @param width
 * @param height
 */
function buildImage(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path } = app_root_path_1.default;
        const fileDetails = yield findFileDetails(path, filename);
        const outputInfos = `${path}/images/thumb/${fileDetails.filename}-${width}-${height}${fileDetails.extension}`;
        if (!(yield transformedFileExists(filename, width, height))) {
            yield (0, promises_1.mkdir)(`${path}/images/thumb`, { recursive: true });
            yield (0, sharp_1.default)(`${path}/images/full/${fileDetails.fullName}`)
                .resize({
                width: width,
                height: height,
            })
                .toFile(outputInfos);
        }
        return outputInfos;
    });
}
exports.buildImage = buildImage;
