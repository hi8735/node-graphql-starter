import { createApolloServer } from "./createApolloServer";
import { Application } from "./Application";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve("./config/.env") });

const port = parseInt(process.env.PORT);
const apolloServer = createApolloServer();
const application = new Application(apolloServer, port);
application.start();

process.on("SIGTERM", (): void => {
  try {
    console.info("*** SIGTERM received");
    application.stop().then((): void => {
      console.info("Exiting with code 0");
      process.exit(0);
    });
  } catch (error) {
    console.error(error);
    console.warn("Exiting with code 1")
    process.exit(1);
  }
});
