export const exactDate = date => {
  const datetime = new Date(date);
  console.log('Priting the date: ', datetime);
  return `${datetime.getFullYear()}/${
    datetime.getDay() + 1
  }/${datetime.getDate()} at ${datetime.getHours()}`;
};
