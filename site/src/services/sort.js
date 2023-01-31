/* eslint-disable import/prefer-default-export */
export const sortObjectArray = (objectArray, keys) => {
  const compare = (a, b) => {
    let comparison = 0;
    keys.forEach((key) => {
      const aKey = a[key].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const bKey = b[key].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (comparison !== 0) return;
      if (aKey > bKey) {
        comparison = 1;
      } else if (aKey < bKey) {
        comparison = -1;
      } else {
        comparison = 0;
      }
    });
    return comparison;
  };
  return objectArray.sort(compare);
};
