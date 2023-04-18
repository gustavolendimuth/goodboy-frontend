/* eslint-disable no-underscore-dangle */
// Esta função transforma o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()

import { sortMultipleKeys } from './sort';

export default (array) => {
  const result = array.map((category) => {
    const subCategories = Array.from(new Set(category.subCategories.map((a) => a.slug.current)))
      .map((slug) => category.subCategories.find((a) => a.slug.current === slug));
    const sortedSubCategories = sortMultipleKeys(subCategories, ['name']);
    return { ...category, subCategories: sortedSubCategories };
  });
  return result;
};
