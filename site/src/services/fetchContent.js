import sanityClient from './sanityClient';

// Função que faz o fetch e retorna um objeto com os produtos, ou categorias, de acordo com os parâmetros passados
// Para fazer o fetch de um produto, é necessário passar o segundo parâmetro com o id do produto
export default async (table, id) => {
  const query = {
    // Query que retorna todos os produtos
    products: `*[_type == "products"] | order(_createdAt asc) {
      _id, title, photo, price, description,
      "categories": categories[]->name,
    }`,
    // Query que retorna somente um produto de acordo com o id passado
    product: `*[_type == "products" && _id == "${id}"] {
      _id, title, photo, price, description,
      "categories": categories[]->name,
    }`,
    // Query que retorna somente as categorias que contém produtos ativos
    categories: `*[_type == "categories" && isMainCategory] {
      "mainCategory": name,
      "subCategories": *[_type == "products" && references(^._id)]{
        "subCategory": categories[1]->name
      }
    }`,
  };

  if (table) {
    try {
      // o fetch utiliza a query que está dentro do objeto query acima
      const response = await sanityClient.fetch(query[table]);
      return response;
    } catch (err) {
      return console.error(err);
    }
  }
};
