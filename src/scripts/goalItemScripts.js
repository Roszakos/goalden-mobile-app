const TODAY = new Date();
const DAYS_TO_ADD = 8 - TODAY.getDay();
const END_OF_WEEK = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + DAYS_TO_ADD, 1);
const END_OF_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1, 1);
const END_OF_YEAR = new Date(TODAY.getFullYear() + 1, 0, 1, 1);

// Displays goals finish date
export const calculateDate = (finishDate) => {
  if (finishDate) {
    finishDate = new Date(finishDate);
    const finishDateNoHours = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
    const todayNoHours = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    if (finishDateNoHours < todayNoHours) {
      return 'time\'s up';
    } else if (finishDateNoHours == todayNoHours) {
      return 'today';
    } else if (finishDate <= END_OF_WEEK) {
      return 'this week';
    } else if (finishDate <= END_OF_MONTH) {
      return 'this month';
    } else if (finishDate <= END_OF_YEAR) {
      return 'this year';
    }
  }
  return 'date not specified';
}

export const chooseGoalBgColor = (priority) => {
  let bgColor = 'gray';
  switch (priority) {
    case 1:
      bgColor = '#d4d13f'
      break;
    case 2:
      bgColor = '#d4963f'
      break;
    case 3:
      bgColor = '#db3e1f'
      break;
    default:
      break;
  }
  return bgColor;
}

export const chooseHeaderBgColor = (priority) => {
  let bgColor = 'gray';
  switch (priority) {
    case 1:
      bgColor = '#d4c03f';
      break;
    case 2:
      bgColor = '#d4853f';
      break;
    case 3:
      bgColor = '#cf2219';
      break;
    default:
      break;
  }
  return bgColor;
}

export const displayPriority = (priority) => {
  let textPriority = 'Not specified';
  switch (priority) {
    case 1:
      textPriority = 'Low';
      break;
    case 2:
      textPriority = 'Medium';
      break;
    case 3:
      textPriority = 'High';
      break;
    default:
      break;
  }
  return textPriority;
}