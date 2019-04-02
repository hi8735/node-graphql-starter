export function getCurrentTimestamp(): string {
  return new Date()
    .toISOString()
    .replace("T", " ")
    .substr(0, 19);
}

export function makeTimestampMessage(message: string, color?: (text: string) => string): string {
  const timestampMessage = `[${getCurrentTimestamp()}] ${message}`;
  return color ? color(timestampMessage): timestampMessage;
}
