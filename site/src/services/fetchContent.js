import sanityClient from './sanityClient';

export default async (table) => {
  const query = {
    products: `*[_type == "products"] | order(_createdAt desc) {
      title, photo, price, description,
      "categories": categories[]->name,
    }`,
    categories: `*[_type == "categories" && isMainCategory] {
      "mainCategory": name,
      "subCategories": *[_type == "products" && references(^._id)]{
        "subCategory": categories[1]->name
      }
    }`,
  };

  if (table) {
    try {
      const response = await sanityClient.fetch(query[table]);
      return response;
    } catch (err) {
      return console.error(err);
    }
  }
};
