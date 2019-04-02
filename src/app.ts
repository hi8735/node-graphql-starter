import {
  ApolloServer,
  Config,
  ServerInfo,
} from "apollo-server";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import { formatError } from "graphql";
import GraphQLContext from "./graphql/type/GraphQLContext";
import rootResolvers from "./graphql/resolvers/rootResolvers";
import { makeTimestampMessage } from "./util/consoleTools";
import { readAllTypeDefs } from "./util/graphQLTools";

(async() => {
  try {
    dotenv.config();
    const typeDefs = await readAllTypeDefs(__dirname + process.env.GRAPHQL_EXT, process.env.GRAPHQL_PATH);
    const apolloConfig: Config = {
      typeDefs: typeDefs,
      resolvers: rootResolvers,
      context: ({ req }: { req: express.Request }): GraphQLContext => {
        return {
          authorizationToken: req.headers["authorization"],
        };
      },
      formatError: (error) => {
        console.error(makeTimestampMessage(`${error.originalError.stack}`, chalk.redBright));
        return formatError(error);
      },
      debug: process.env.NODE_ENV !== 'production',
    };
    const apolloServer = new ApolloServer(apolloConfig);
    const serverInfo: ServerInfo = await apolloServer.listen(9000);
    console.log(makeTimestampMessage(`[${chalk.yellow(process.env.NODE_ENV)}] Server is running @ ${chalk.underline(serverInfo.url)}`, chalk.greenBright));
    console.log(makeTimestampMessage(`GraphQL Playground is available @ ${chalk.underline(`${serverInfo.url}graphql`)}`, chalk.cyanBright));
  } catch (error) {
    console.error(makeTimestampMessage(`${error.originalError.stack}`, chalk.redBright));
  }
})();
