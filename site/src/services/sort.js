/* eslint-disable import/prefer-default-export */
export const sortObjectArray = (objectArray, keys) => {
  const compare = (a, b) => {
    let comparison = 0;
    keys.forEach((key) => {
      if (comparison !== 0) return;
      if ((a[key] || 0) > (b[key] || 0)) {
        comparison = 1;
      } else if ((a[key] || 0) < (b[key] || 0)) {
        comparison = -1;
      } else {
        comparison = 0;
      }
    });
    return comparison;
  };
  return objectArray.sort(compare);
};
