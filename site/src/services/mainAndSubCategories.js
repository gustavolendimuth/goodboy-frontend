export default (categories) => categories.map((mainCategory) => (
  {
    mainCategory: mainCategory.name,
    subCategories: [...new Set(mainCategory.categories
      .map((subCategory) => subCategory)
      .map((category) => category.category))],
  }
));
