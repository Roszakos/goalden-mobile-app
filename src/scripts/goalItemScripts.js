import moment from 'moment';

// const TODAY = new Date();
// const DAYS_TO_ADD = 8 - TODAY.getDay();
// const END_OF_WEEK = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + DAYS_TO_ADD, 1);
// const END_OF_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1, 1);
// const END_OF_YEAR = new Date(TODAY.getFullYear() + 1, 0, 1, 1);

const TODAY = moment().format(moment.HTML5_FMT.DATE);
const END_OF_WEEK = moment().endOf('week').add(2, 'd').format(moment.HTML5_FMT.DATE);
const END_OF_MONTH = moment().endOf('month').add(1, 'd').format(moment.HTML5_FMT.DATE);
const END_OF_YEAR = moment().endOf('year').add(1, 'd').format(moment.HTML5_FMT.DATE);


// Divide goals into 5 groups --> time finished, this week, this month, this year, later
export const groupGoalsByFinishDate = (goals) => {
  const groupedGoals = {
    timeout: {label: 'Timed out', list: []},
    thisWeek: {label: 'This week', list: []},
    thisMonth: {label: 'This month', list: []},
    thisYear: {label: 'This year', list: []},
    longer: {label: 'More time', list: []}
  }
  goals.map((goal) => {
    const goalFinishDate = moment(goal.finishDate).format(moment.HTML5_FMT.DATE);
    if (goalFinishDate < TODAY) {
      groupedGoals.timeout.list.push(goal);
    } else if (goalFinishDate <= END_OF_WEEK) {
      groupedGoals.thisWeek.list.push(goal);
    } else if (goalFinishDate <= END_OF_MONTH) {
      groupedGoals.thisMonth.list.push(goal);
    } else if (goalFinishDate <= END_OF_YEAR) {
      groupedGoals.thisYear.list.push(goal);
    } else {
      groupedGoals.longer.list.push(goal);
    }
  })
  //console.log(groupedGoals.timeout.list);
  return groupedGoals;
}

// Displays goals finish date
export const calculateDate = (finishDate) => {
  if (finishDate) {
    // finishDate = new Date(finishDate);
    // const finishDateNoHours = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
    // const todayNoHours = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    // if (finishDateNoHours < todayNoHours) {
    //   return 'time\'s up';
    // } else if (finishDateNoHours == todayNoHours) {
    //   return 'today';
    // } else if (finishDate <= END_OF_WEEK) {
    //   return 'this week';
    // } else if (finishDate <= END_OF_MONTH) {
    //   return 'this month';
    // } else if (finishDate <= END_OF_YEAR) {
    //   return 'this year';
    // }
    const date = moment(finishDate);
    if (finishDate < moment()) {
      return date.from(moment());
    } else {
      return date.from(moment(), true);
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