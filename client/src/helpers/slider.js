import moment from 'moment';

export function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push( moment(currentDate).format('L') );
    currentDate = moment(currentDate).add(1, 'days');
  }

  return dateArray;
}
