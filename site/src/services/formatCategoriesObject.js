/* eslint-disable no-underscore-dangle */
// Esta função transforma o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
export default (categories) => categories.map((category) => (
  {
    name: category.name,
    id: category._id,
    icon: category.icon,
    subCategories: [...new Set(category.subCategories
      .map((subCategories) => subCategories)
      .map((subCategory) => subCategory.subCategory))],
  }
));
