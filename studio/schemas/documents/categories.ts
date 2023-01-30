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
      name: 'icon',
      type: 'figure',
      title: 'Icone',
    },
    {
      type: 'boolean',
      name: 'isMainCategory',
      title: 'Categoria principal',
      initialValue: false,
      description: 'Ativar esta opção caso seja uma categoria principal, com subcategorias abaixo dela',
    },
  ],
};
