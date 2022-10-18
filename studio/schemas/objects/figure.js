export default {
  name: 'figure',
  type: 'object',
  title: 'Figure',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Imagem',
      validation: (Rule) => Rule.required(),
      description: 'Faça upload de uma imagem, ou selecione uma da galeria',
      liveEdit: false,
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Texto alternativo da imagem - SEO',
      validation: (Rule) => Rule.required(),
      description: `Preencha este campo com um texto que descreva a imagem. 
      Imagens com texto alternativo ajudam no ranking dos sites de busca.`,
    },
  ],
};
