export const isNumber = (arg: unknown): arg is number => {
  return (
    (typeof arg === 'number' || typeof arg === 'string') && !isNaN(Number(arg))
  );
};
