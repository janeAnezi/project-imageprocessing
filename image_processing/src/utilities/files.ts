import { promises as fsPromises } from 'fs';
import sharp from 'sharp';
import appRootPath from 'app-root-path';
import Path from 'path';
import { mkdir } from 'fs/promises';

/**
 * Get file details like name, extension and full name
 * @param path
 * @param filename
 */
async function findFileDetails(
  path: string,
  filename: string
): Promise<{ fullName: string; filename: string; extension: string }> {
  const files = await fsPromises.readdir(`${path}/images/full`);

  if (files.length < 1)
    throw new Error(`could not find file ${filename} in directory`);

  const file = files
    .filter((entry: string): boolean => entry.includes(filename))
    .reduce((element: string): string => element);

  return {
    fullName: file,
    filename: filename,
    extension: Path.extname(file),
  };
}

export async function transformedFileExists(
  filename: string,
  width: number,
  height: number
): Promise<boolean> {
  try {
    const { path } = appRootPath;
    const details = await findFileDetails(path, filename);
    const metadata = await sharp(
      `${path}/images/thumb/${details.filename}-${width}-${height}${details.extension}`
    ).metadata();
    return metadata.width === width && metadata.height === height;
  } catch (err) {
    return false;
  }
}

/**
 * Build a resize
 * @param filename
 * @param width
 * @param height
 */
export async function buildImage(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const { path } = appRootPath;
  const fileDetails = await findFileDetails(path, filename);
  const outputInfos = `${path}/images/thumb/${fileDetails.filename}-${width}-${height}${fileDetails.extension}`;

  if (!(await transformedFileExists(filename, width, height))) {
    await mkdir(`${path}/images/thumb`, { recursive: true });

    await sharp(`${path}/images/full/${fileDetails.fullName}`)
      .resize({
        width: width,
        height: height,
      })
      .toFile(outputInfos);
  }

  return outputInfos;
}
