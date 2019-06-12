import chalk from "chalk";

export const getCurrentTimestamp = (): string => new Date()
  .toISOString()
  .replace("T", " ")
  .substr(0, 19);

export const makeTimestampMessage = (message: string, color?: (text: string) => string): string => {
  const timestampMessage = `[${getCurrentTimestamp()}] ${message}`;
  return color ? color(timestampMessage): timestampMessage;
};

export const log = (
  message: string,
  color?: (text: string) => string
): void => process.env.LOGGING.toLowerCase() === "true" && console.info(makeTimestampMessage(message, color));

export const errorLog = (
  error: any
): void => console.error(
  makeTimestampMessage(`${error.originalError && error.originalError.stack || error.stack}`, chalk.redBright)
);
