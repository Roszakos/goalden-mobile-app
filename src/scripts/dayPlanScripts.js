import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export const storeDayPlans = async (plans) => {
  try {
      const plansJson = JSON.stringify(plans)
      await AsyncStorage.setItem('dayPlans', plansJson);
  } catch (e) {
      console.log(e);
  }
}
export const getDayPlans = async () => {
  try {
      const plansJson = await AsyncStorage.getItem('dayPlans')
      return plansJson != null ? JSON.parse(plansJson) : [];
  } catch (e) {
      console.log(e);
  }
}

export const searchForPlanToRepeat = (plans) => {
  const today = moment().format(moment.HTML5_FMT.DATE);
  const yesterday = moment(today).subtract(1, 'd').format(moment.HTML5_FMT.DATE);
  const sameDayLastWeek = moment(today).subtract(7, 'd').format(moment.HTML5_FMT.DATE);

  let yesterdayPlan = plans.find((plan) => plan.date == yesterday);
  if (yesterdayPlan) {
    yesterdayPlan = yesterdayPlan.tasks;
    yesterdayPlan.forEach((task) => task.isDone = false);
  }

  let lastWeekPlan = plans.find((plan) => plan.date == sameDayLastWeek);
  if (lastWeekPlan) {
    lastWeekPlan = lastWeekPlan.tasks;
    lastWeekPlan.forEach((task) => task.isDone = false); 
  }

  const repeatablePlans = [yesterdayPlan ? yesterdayPlan : false, lastWeekPlan ? lastWeekPlan : false];
  if (repeatablePlans[0] || repeatablePlans[1]) {
    return repeatablePlans;
  }
  return false;
}