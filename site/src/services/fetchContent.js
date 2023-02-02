/* eslint-disable react-func/max-lines-per-function */
import groq from 'groq';
import sanityClient from './sanityClient';

// Função que faz o fetch e retorna um objeto com os produtos, ou categorias, de acordo com os parâmetros passados
// Para fazer o fetch de um produto, é necessário passar o segundo parâmetro com o id do produto
export default async ({ query, id, mainCategory, subCategory }) => {
  // verificar se o id é uma string, caso seja, transformar em array
  let idArray = [];
  if (!Array.isArray(id)) {
    idArray = [id];
  } else {
    idArray = id;
  }

  const groqQuery = {
    // Query que retorna todos os produtos
    products: groq`
    *[_type == "products"] | order(_updatedAt desc)[0...30] {
      _id, title, photo, price, description, sale, spotlight,
      "categories": categories[]->name,
    }`,
    saleAndSpotlight: groq`
    *[_type == "products" && (sale == true || spotlight == true)] {
      _id, title, photo, price, description, sale, spotlight,
      "categories": categories[]->name,
    }`,
    // Query que retorna um produto ou uma lista de produtos
    product: groq`
      *[_type == "products" && _id in ${JSON.stringify(idArray)}] {
        _id, title, photo, price, description,
        "categories": categories[]->name,
      }`,
    // Query que retorna somente as categorias que contém produtos ativos
    categories: groq`
      *[_type == "categories" && _id in array::unique(*[_type == "products" ].categories[]._ref) && isMainCategory] {
        name, _id, icon, slug,
        "subCategories": *[_type == "products" && references(^._id)]{
          ...(categories[1]->{name, slug, _id, icon})
        }
      }`,
    // Query que retorna todas as categorias
    allCategories: groq`*[_type == "categories"]`,
    // Query que retorna todos os produtos de uma categoria
    productsByCategory: groq`
      *[_type == "products" && ${JSON.stringify(mainCategory)} in categories[]->slug.current &&  ${JSON.stringify(subCategory)} in categories[]->slug.current ]{
      ... , "categories": categories[]->name
    }`,
  };

  if (query) {
    try {
      // o fetch utiliza a query que está dentro do objeto groqQuery acima
      const response = await sanityClient.fetch(groqQuery[query]);
      return response;
    } catch (err) {
      return console.error(err);
    }
  }
};
