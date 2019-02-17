import fs, { PathLike } from "fs";

export const readFileAsync = (
  path: PathLike,
  options: { encoding?: string | null; flag?: string; } | string | undefined | null,
) => {
  return new Promise<string | Buffer>((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const readDirAsync = (path: PathLike, ext?: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        if (ext && ext.length > 0) {
          resolve(files.map(file => file.endsWith(ext) && file));
        } else {
          resolve(files);
        }
      }
    });
  });
};
