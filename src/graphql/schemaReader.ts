import { gql } from "apollo-server";
import { DocumentNode } from "graphql";
import path from "path";
import { readFileAsync, readDirAsync } from "../util/fsUtil";
import chalk from "chalk";
import { timestampMessage } from "../util/consoleHelper";

// Path that contains GraphQL schema files
const schemaPath = path.join(__dirname, '../graphql/schemas');

// Since GraphQL file extensions are varied, you may use the suitable extension for your needs
const graphqlExtention = '.graphql';

export const getTypeDefsAsync = async () => {
  const fileNames = await readDirAsync(schemaPath, graphqlExtention);

  console.log(chalk.greenBright(timestampMessage(`${fileNames.length} schema files found:`)))
  console.log(fileNames.map(file => file).join('\n'));

  const typeDefs: DocumentNode[] = await Promise.all(
    fileNames.map(
      async (fileName) => {
        const fileContent = await readFileAsync(`${schemaPath}/${fileName}`, 'utf-8');
        const sdl = typeof fileContent === 'string' ? fileContent : fileContent.toString('utf8');
        return gql(sdl);
      }
    )
  );

  return typeDefs;
};
