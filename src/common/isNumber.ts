export const isNumber = (arg: unknown): arg is number => {
  return !isNaN(Number(arg));
};
