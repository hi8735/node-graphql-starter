import { ApolloServer } from "apollo-server";
import chalk from "chalk";
import {
  errorLog,
  log,
} from "./util/loggingTools";

export class Application {

  private port: number;
  private server: ApolloServer;

  constructor(server: ApolloServer, port: number) {
    this.port = port;
    this.server = server;
  }

  async start(): Promise<void> {
    try {
      // Place DB connecting here
      log("Connected to database", chalk.cyanBright);

      const serverInfo = await this.server.listen(this.port);
      log(`[${chalk.yellow(process.env.NODE_ENV)}] Server is running @ ${chalk.underline(serverInfo.url)}`, chalk.greenBright);
      log(`GraphQL Playground is available @ ${chalk.underline(`${serverInfo.url}graphql`)}`, chalk.cyanBright);
    } catch (error) {
      errorLog(error);
    }
  }

  async stop(): Promise<void> {
    await this.server.stop();
    log("Server stopped receiving requests", chalk.yellowBright);

    // Place DB disconnecting here
    log("DB connection closed", chalk.yellowBright);
  }
}
