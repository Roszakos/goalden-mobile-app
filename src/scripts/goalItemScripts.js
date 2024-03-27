import moment from 'moment';

// Displays goals finish date
export const calculateDate = (finishDate) => {
  if (finishDate) {
    const date = moment(finishDate);
    if (date.isBetween(moment().startOf('day'), moment().endOf('day'))) {
      return date.fromNow(true);
    } 
    if (date < moment()) {
      return date.fromNow();
    }
    return date.fromNow(true);
  }
  return 'date not specified';
}
