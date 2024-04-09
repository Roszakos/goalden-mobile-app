import moment from 'moment';

// Displays goals finish date
export const displayTimeLeft = (finishDate) => {
  if (finishDate) {
    const date = moment(finishDate);
    if (date < moment()) {
      return '-';
    }
    return date.diff(new Date(), 'days') + ' days';
  }
  return 'Not specified';
}

export const displayMilestonesLeft = () => {
  return '3 / 5'
}
