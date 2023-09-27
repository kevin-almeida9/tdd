export enum Colors {
  WHITE = '#FFF',
  LIGHT_GRAY = '#484858',
  GRAY = '#5D6972',
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
