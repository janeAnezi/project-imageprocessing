import supertest from "supertest";
import { app } from "../index";
import appRootPath from 'app-root-path';
import { promises as fsPromises } from 'fs';
import { ImageService } from '../routes/index';
import { buildImage, transformedFileExists } from '../utilities/files';

describe('Image processing API', () => {
  beforeEach(async () => {
    await fsPromises.rm(`${appRootPath.path}/images/thumb`, {
      recursive: true,
      force: true,
    });
  });

  it('app should have a resize endpoint handler', (): void => {
    expect(ImageService.handleImage).toBeDefined();
  });

  it('should be accessible', async (): Promise<void> => {
    const width = 300;
    const height = 100;
    const filename = 'palmtunnel';

    const response = await supertest(app).get(
      `/api/image?filename=${filename}&width=${width}&height=${height}`
    );
    expect(response.status).toEqual(200);
  });

  it('should make multiple resizes', async (): Promise<void> => {
    const parameters = [
      { filename: 'palmtunnel', width: 100, height: 200 },
      { filename: 'palmtunnel', width: 200, height: 100 },
    ];

    async function checkFunction(item: {
      filename: string;
      width: number;
      height: number;
    }) {
      await buildImage(item.filename, item.width, item.height);
      return await transformedFileExists(
        item.filename,
        item.width,
        item.height
      );
    }

    expect(parameters.every(checkFunction)).toBeTrue();
  });

  afterAll(async (): Promise<void> => {
    await fsPromises.rm(`${appRootPath.path}/images/thumb`, {
      recursive: true,
      force: true,
    });
  });
});











// const request = supertest(app);
// describe('Test endpoint responses', () => {
//     it('gets the api endpoint', async () => {
//         const response = await request.get('/api');
//         expect(response.status).toBe(200);
      
//     }
// )});