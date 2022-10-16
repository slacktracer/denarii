export const makeEnhancedArray = (object) => {
  const x = Object.values(object);

  x.$ = object;

  return x;
};
