import { gql } from "apollo-server";
import { DocumentNode } from "graphql";
import path from "path";
import { readFileAsync, readDirAsync } from "../util/fsUtil";

const sdlPath = path.join(__dirname, '../graphql/');

export const getTypeDefs = () => {
  let filePaths: string[];
  readDirAsync(sdlPath).then((value) => { filePaths = value; });

  let typeDefs: DocumentNode[];
  Promise.all(
    filePaths.map(
      async (filePath) => {
        const fileContent = await readFileAsync(filePath, 'utf-8');
        const sdl = typeof fileContent === 'string' ? fileContent : fileContent.toString('utf8');
        return gql(sdl);
      }
    )
  ).then(
    (value) => {
      typeDefs = value;
    }
  );

  return typeDefs;
};
