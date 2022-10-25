import sanityClient from './sanityClient';

const fetchContent = async (doc) => {
  const query = {
    products: `*[_type == "products"] | order(_createdAt desc) {
      title, photo, price, description,
      categories[]->{name, isMainCategory},
    }`,
    categories: `*[_type == "categories"] {
      name, isMainCategory
    }`,
  };

  if (doc) {
    try {
      const response = await sanityClient.fetch(query[doc]);
      return response;
    } catch (err) {
      return console.error(err);
    }
  }
};
export default fetchContent;
