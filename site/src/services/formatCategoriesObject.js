// Esta função transforma o retorno da API em um objeto mais simples
// e remove as subcategorias duplicadas com a função new Set()
export default (categories) => categories.map((mainCategory) => (
  {
    mainCategory: mainCategory.mainCategory,
    subCategories: [...new Set(mainCategory.subCategories
      .map((subCategories) => subCategories)
      .map((subCategory) => subCategory.subCategory))],
  }
));
