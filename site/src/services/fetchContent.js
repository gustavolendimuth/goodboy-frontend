import sanityClient from './sanityClient';

const fetchContent = async (doc) => {
  let query;
  if (doc === 'products') {
    query = '*[_type == "products"]';
  } else if (doc === 'siteSettings') {
    query = `*[_type == "siteSettings"] 
      | order(_createdAt asc)[0]`;
  }

  if (doc) {
    try {
      const response = await sanityClient.fetch(query);
      return response;
    } catch (e) {
      return console.error(e);
    }
  }
};
export default fetchContent;
