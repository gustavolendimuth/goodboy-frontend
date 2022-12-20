const options = {
  timeZone: 'America/Sao_Paulo',
};

function addZero(i) {
  if (i < 10) i = `0${i}`;
  return i;
}

export default ({ date, format = 'pt-BR' }) => {
  const dateToFormat = new Date(date);
  const formattedDate = dateToFormat.toLocaleDateString(format, options);
  return `${formattedDate} - ${addZero(dateToFormat.getHours())}h:${addZero(dateToFormat.getMinutes())}`;
};
