import express from 'express';
import { ImageService } from './routes/index';

export const app: express.Application = express();
const port = 8000;

app.get('/api/image', ImageService.handleImage);

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});
