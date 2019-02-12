const getTimestamp = () => new Date().toISOString().replace('T', ' ').substr(0, 23);

export const timestampMessage = (message: string) => `[${getTimestamp()}] ${message}`;
