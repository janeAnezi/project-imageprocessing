import { Request, Response } from 'express';
import { buildImage } from '../utilities/files';

export class ImageService {
  /**
   * Handle a file resize request
   * @param req
   * @param res
   */
  static async handleImage(req: Request, res: Response): Promise<void> {
    try {
      const absoluteName = await buildImage(
        req.query.filename as string,
        parseInt(<string>req.query.width),
        parseInt(<string>req.query.height)
      );
      res.sendFile(absoluteName);
    } catch (err) {
      res.status(400).send(`Could not resize image`);
    }
  }
}

