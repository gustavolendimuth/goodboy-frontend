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
    },
    {
      name: 'price',
      type: 'string',
      title: 'Preço',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Descrição',
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
