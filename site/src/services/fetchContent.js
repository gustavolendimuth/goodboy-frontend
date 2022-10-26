import sanityClient from './sanityClient';

export default async (table) => {
  const query = {
    products: `*[_type == "products"] | order(_createdAt desc) {
      title, photo, price, description,
      "categories": categories[]->name,
    }`,
    categories: `*[_type == "categories" && isMainCategory] {
      name,
      "categories": *[_type == "products" && references(^._id)]{
        "category": categories[1]->name
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
