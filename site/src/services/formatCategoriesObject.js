/* eslint-disable no-underscore-dangle */
// Esta função transforma o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
// export default (categories) => categories.map((category) => (
//   {
//     name: category.name,
//     id: category._id,
//     icon: category.icon,
//     subCategories: [...new Set(category.subCategories
//       .map((subCategories) => subCategories)
//       .map((subCategory) => subCategory.subCategory))],
//   }
// ));

import { sortObjectArray } from './sort';

export default (array) => {
  const result = array.map((category) => {
    const subCategories = Array.from(new Set(category.subCategories.map((a) => a.slug.current)))
      .map((slug) => category.subCategories.find((a) => a.slug.current === slug));
    const sortedSubCategories = sortObjectArray(subCategories, ['name']);
    console.log(subCategories, sortedSubCategories);
    return { ...category, subCategories: sortedSubCategories };
  });
  return result;
};
