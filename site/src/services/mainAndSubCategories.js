export default (categories) => categories.map((category) => (
  {
    MainCategory: category.name,
    categories: [...new Set(category.products
      .map((product) => product.categories)
      .map((productCategory) => productCategory)
      .map((subcategory) => subcategory[1].name))],
  }
));
