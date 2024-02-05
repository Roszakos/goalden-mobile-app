import moment from 'moment';

moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'today',
        ss : 'today',
        m:  "today",
        mm: "today",
        h:  "today",
        hh: "today",
        d:  "today",
        w:  "1 week",
        M:  "1 month",
        y:  "1 year",
    }
});

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
  return groupedGoals;
}

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