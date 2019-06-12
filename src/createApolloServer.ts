import {
  ApolloServer,
  Config,
  gql,
} from "apollo-server";
import {
  readdirSync,
  readFileSync,
} from "fs";
import {
  DocumentNode,
  formatError,
  GraphQLError,
  GraphQLFormattedError,
} from "graphql";
import { rootResolvers } from "./graphql/resolvers/rootResolvers";
import { errorLog } from "./util/loggingTools";

function readAllTypeDefs(path: string): DocumentNode[] {
  const fileNames = readdirSync(path).filter((fileName): boolean => fileName.endsWith("graphql"));
  const typedefs: DocumentNode[] = fileNames.map((fileName): DocumentNode => {
    const fileContent = readFileSync(`${path}/${fileName}`, "utf8");
    return gql(fileContent);
  });
  return typedefs;
}

export function createApolloServer(): ApolloServer {
  const typeDefs = readAllTypeDefs(__dirname + "/graphql/schema");
  const apolloConfig: Config = {
    typeDefs: typeDefs,
    resolvers: rootResolvers,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      errorLog(error);
      return formatError(error);
    },
    debug: process.env.NODE_ENV !== "production",
    introspection: true
  };
  return new ApolloServer(apolloConfig);
}
