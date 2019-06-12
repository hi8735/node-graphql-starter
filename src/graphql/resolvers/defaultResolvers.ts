export const defaultResolvers = {
  query: {
    serverTimezoneOffset: (): number => new Date().getTimezoneOffset() / 60 * -1,
  },
  mutation: {
    health: (parent: any, args: { value: string }): string => args.value == null ? "OK" : args.value,
  },
};
