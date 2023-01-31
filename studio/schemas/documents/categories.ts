export default {
  name: 'categories',
  type: 'document',
  title: 'Categorias',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Nome',
      validation: (Rule:any) => Rule.required(),
    },
        {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'Clique no botão generate para gerar um link único.',
      validation: (Rule:any) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 200,
        // isUnique: () => true,
      },
    },
    {
      type: 'boolean',
      name: 'isMainCategory',
      title: 'Categoria principal',
      initialValue: false,
      description: 'Ativar esta opção caso seja uma categoria principal, com subcategorias abaixo dela',
    },
    {
      name: 'icon',
      type: 'figure',
      title: 'Icone',
    },
  ],
};
