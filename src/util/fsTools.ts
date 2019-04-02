import fs from "fs";
import util from "util";

export async function readDirAsync(path: fs.PathLike, extension?: string): Promise<string[]> {
  const files: string[] = await util.promisify(fs.readdir)(path);
  return files.filter(file => file.endsWith(extension));
}

export async function readFileAsync(path: fs.PathLike): Promise<string> {
  return util.promisify(fs.readFile)(path, "utf-8");
}
