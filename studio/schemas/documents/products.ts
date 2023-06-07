import MaskedInput from '../components/MaskedInput';

const mask = '9999.99.99';

export default {
  name: 'products',
  type: 'document',
  title: 'Produtos',
  fields: [
    {
      title: 'Situação',
      name: 'situation',
      type: 'string',
      validation: (Rule:any) => Rule.required().error('A situação é obrigatória'),
      initialValue: 'A',
      options: {
        list: [
          { title: 'Ativo', value: 'A' },
          { title: 'Inativo', value: 'I' },
          { title: 'Excluído', value: 'E' },
        ],
      },
    },
    {
      name: 'title',
      type: 'string',
      title: 'Nome',
      validation: (Rule:any) => Rule.custom((title:any, context:any) => 
        new Promise(resolve => {
          let query;
          const docId = context.document._id;
          const isDraft = docId.startsWith('drafts.');
          let nonDraftId = '';

          if (isDraft) {
            nonDraftId = docId.replace('drafts.', '');
            query = `*[_type == "products" && _id != $docId && _id != $nonDraftId && lower(title) == $title][0]`;
          } else {
            query = `*[_type == "products" && _id != $docId && !(_id in path("drafts." + $docId)) && lower(title) == $title][0]`;
          }
          SanityClient.fetch(query, {title: title.toLowerCase(), docId, nonDraftId})
            .then(res => resolve(!res ? true : 'O nome deve ser único'))
        })
      )
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Clique no botão generate para gerar um link único para o produto.',
      validation: (Rule:any) => Rule.required().error('O slug é obrigatório'),
      options: {
        source: 'title',
        maxLength: 200,
        // isUnique: () => true,
      },
    },
    {
      name: 'photo',
      type: 'figure',
      title: 'Foto',
      validation: (Rule:any) => Rule.required().error('A foto é obrigatória'),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Preço',
      description: 'Utilize ponto para separar as casas decimais. Ex: 9.99',
      validation: (Rule:any) => Rule.required().precision(2).min(0.01).error('O preço deve ser maior que 0 e ter no máximo 2 casas decimais'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Descrição',
    },
    {
      name: 'ncm',
      type: 'string',
      title: 'Código NCM',
      components: {
        input: MaskedInput,
      },
      validation: (Rule:any) => Rule.required().length(10),
      description: 'Código NCM do produto. Para rações e semelhantes usar 2309.10.00. Para outros itens, consultar o site da Receita Federal.',
    },
    {
      name: 'sale',
      type: 'boolean',
      title: 'Promoção',
      description: 'Marque esta opção se o produto está em promoção',
      initialValue: false,
    },
    {
      name: 'spotlight',
      type: 'boolean',
      title: 'Destaque',
      description: 'Marque esta opção se o produto está em destaque',
      initialValue: false,
    },
    {
      type: 'array',
      name: 'categories',
      title: 'Categorias',
      of: [
        {
          type: 'reference',
          to: [{ type: 'categories' }],
        },
      ],
    },
  ],
};
