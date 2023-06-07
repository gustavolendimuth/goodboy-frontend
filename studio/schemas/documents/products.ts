import MaskedInput from '../components/MaskedInput';
import SanityClient from '../utils/sanityClient';


export default {
  name: 'products',
  type: 'document',
  title: 'Produtos',
  fields: [
    {
      title: 'Situação',
      name: 'situation',
      type: 'string',
      validation: (Rule:any) => Rule.required(),
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
      validation: (Rule:any) => Rule.required(),
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
      title: 'Código de Origem',
      name: 'originCode',
      type: 'number',
      validation: (Rule:any) => Rule.required(),
      initialValue: 0,
      options: {
        list: [
          { title: '0 - Nacional, exceto as indicadas nos códigos 3 a 5', value: 0 },
          { title: '1 - Estrangeira - Importação direta, exceto a indicada no código 6', value: 1 },
          { title: '2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7', value: 2 },
          { title: '3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%', value: 3 },
          { title: '4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes', value: 4 },
          { title: '5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%', value: 5 },
          { title: '6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX', value: 6 },
          { title: '7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX', value: 7 },
        ],
      },
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
