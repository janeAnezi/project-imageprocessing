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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs_1 = require("fs");
const index_2 = require("../routes/index");
const files_1 = require("../utilities/files");
describe('Image processing API', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fs_1.promises.rm(`${app_root_path_1.default.path}/images/thumb`, {
            recursive: true,
            force: true,
        });
    }));
    it('app should have a resize endpoint handler', () => {
        expect(index_2.ImageService.handleImage).toBeDefined();
    });
    it('should be accessible', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = 300;
        const height = 100;
        const filename = 'palmtunnel';
        const response = yield (0, supertest_1.default)(index_1.app).get(`/api/image?filename=${filename}&width=${width}&height=${height}`);
        expect(response.status).toEqual(200);
    }));
    it('should make multiple resizes', () => __awaiter(void 0, void 0, void 0, function* () {
        const parameters = [
            { filename: 'palmtunnel', width: 100, height: 200 },
            { filename: 'palmtunnel', width: 200, height: 100 },
        ];
        function checkFunction(item) {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, files_1.buildImage)(item.filename, item.width, item.height);
                return yield (0, files_1.transformedFileExists)(item.filename, item.width, item.height);
            });
        }
        expect(parameters.every(checkFunction)).toBeTrue();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fs_1.promises.rm(`${app_root_path_1.default.path}/images/thumb`, {
            recursive: true,
            force: true,
        });
    }));
});
// const request = supertest(app);
// describe('Test endpoint responses', () => {
//     it('gets the api endpoint', async () => {
//         const response = await request.get('/api');
//         expect(response.status).toBe(200);
//     }
// )});
