import { gql } from "apollo-server";
import { DocumentNode } from "graphql";
import { readDirAsync, readFileAsync } from "./fsTools";

export async function readAllTypeDefs(path: string, extension: string): Promise<DocumentNode[]> {
  const fileNames = await readDirAsync(path, extension);
  const typedefs: DocumentNode[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContent = await readFileAsync(`${path}/${fileName}`);
      return gql(fileContent);
    })
  );
  return typedefs;
}

export function doesInfoHaveField(info: any, fieldName: string): boolean {
  return info.fieldNodes[0].selectionSet.selections.find((selection: any) => selection.name.value === fieldName);
}

export function getAllRequestedFields<T>(info: any): (keyof T)[] {
  return info.fieldNodes[0].selectionSet.selections.map((selection: any) => selection.name.value as keyof T);
}
