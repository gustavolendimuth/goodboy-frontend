export default (array, many) => {
  const result = array?.sort(() => Math.random() - 0.5);
  if (array && many) return result.splice(0, many);
  return result;
};
