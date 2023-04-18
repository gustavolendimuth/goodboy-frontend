import MaskedInput from '../components/MaskedInput';

const mask = '9999.99.99';

export default {
  name: 'products',
  type: 'document',
  title: 'Produtos',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Nome',
    },
    {
      name: 'photo',
      type: 'figure',
      title: 'Foto',
      validation: (Rule:any) => Rule.required(),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Preço',
      validation: (Rule:any) => Rule.required().min(0).precision(2),
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
