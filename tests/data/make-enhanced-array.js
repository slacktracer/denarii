export const makeEnhancedArray = ({ id, object }) => {
  const enhancedArray = Object.values(object);

  enhancedArray.byBindingName = object;

  enhancedArray.byID = enhancedArray.reduce((itemsByName, item) => {
    itemsByName[item[id]] = item;

    return itemsByName;
  }, {});

  // legacy, will be removed
  enhancedArray.$ = enhancedArray.byBindingName;

  return enhancedArray;
};
