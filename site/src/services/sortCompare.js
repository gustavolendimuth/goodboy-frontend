const sortCompare = (...prop) => (objectA, objectB) => {
  const a = objectA[prop[0]];
  const b = objectB[prop[0]];
  if (a > b) return 1;
  if (a < b) return -1;
  if (prop.length > 1) return comparatorGenerator(...prop.slice(1))(objectA, objectB);
  return 0;
};

export default sortCompare;
