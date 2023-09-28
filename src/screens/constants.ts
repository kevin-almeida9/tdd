export enum Colors {
  WHITE = '#FFF',
  LIGHT_GRAY = '#484858',
  LIGHTER_GRAY = '#73767f',
  GRAY = '#5D6972',
  DARK_GRAY = '#595c66',
  DARKER_GRAY = '#2c2d35',
}

export const allMonth = [
  'Jan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dez',
];

export function formatDate(date: Date) {
  const today = date.getDate();
  const todayFormatted = today < 10 ? `0${today}` : today;

  const month = date.getMonth();
  const monthFormatted = allMonth[month];

  const dateFomatted = `${monthFormatted} ${todayFormatted}, ${date.getFullYear()}`;
  return dateFomatted;
}
