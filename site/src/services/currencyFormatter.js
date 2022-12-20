export default ({ format, value, symbol }) => {
  const formatter = new Intl.NumberFormat(format, {
    style: symbol && 'currency', // estas duas linhas são necessárias para adicionar o símbolo de moeda
    currency: symbol && 'BRL',

    // A variável format representa idioma em que será formatado o valor.
    // valores possíveis: 'pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE'

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
};
