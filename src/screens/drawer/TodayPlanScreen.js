import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import TaskListItem from '../../components/day-plan/TaskListItem';
import DateDisplay from '../../components/DateDisplay';
import { storeDayPlans, getDayPlans, searchForPlanToRepeat, sortTasks, setTaskNotification } from '../../scripts/dayPlanScripts';
import PlanRepeatModal from '../../components/day-plan/PlanRepeatModal';
import { cancelNotification } from '../../scripts/notificationScripts';

import { useSelector, useDispatch } from 'react-redux';
import { set as setTasks, add as addTask, update, destroy} from '../../features/tasks/tasksSlice';
import { set as setLatestPlanDate } from '../../features/tasks/latestPlanDateSlice';
import { add as addPreviousPlan } from '../../features/tasks/previousDaysTasksSlice';


export default function DailyPlanScreen(props) {
  //const { tasks, setTasks, getTodayTasks, storeTodayTasks, getLatestPlanDate, storeLatestPlanDate } = useContext(TodayPlanContext);
  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks);
  const latestPlanDate = useSelector(state => state.latestPlanDate);
  const previousDaysTasks = useSelector(state => state.previousDaysTasks);

  const todaysDate = moment().format('dddd') + ', ' + moment().format('DD - MM - YYYY')

  const [finishedActivities, setFinishedActivities] = useState([]);
  const [unfinishedActivities, setUnfinishedActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [repeatablePlans, setRepeatablePlans] = useState([]);

  useEffect(() => {
        if (!latestPlanDate || latestPlanDate < moment().format(moment.HTML5_FMT.DATE)) {
          if (tasks.length && latestPlanDate) {
            dispatch(addPreviousPlan({
              date: latestPlanDate,
              tasks: tasks
            }))

            const availablePlans = searchForPlanToRepeat(previousDaysTasks);
            if (availablePlans) {
              setRepeatablePlans(availablePlans);
              setShowModal(true);
            }
            dispatch(setTasks([]));
          } else {
            //storeLatestPlanDate(moment().format(moment.HTML5_FMT.DATE));
            dispatch(setLatestPlanDate(moment().format(moment.HTML5_FMT.DATE)))
            dispatch(setTasks([]));
          }
        } else {
          dispatch(setTasks([]));
        }
  }, []);

  useEffect(() => {
    const sorted = sortTasks(tasks.list);
    setFinishedActivities(sorted[0]);
    setUnfinishedActivities(sorted[1]);
  }, [tasks])

  const changeFinishState = (task, finishState) => {
    dispatch(update({
      id: task.id,
      task: task.task,
      time: task.time,
      isFinished: finishState
    }))
  }

  const deleteTask = (task) => {
    cancelNotification(task.id);
    dispatch(destroy(task));
  }

  const modalSelectedOption = (option) => {
    storeLatestPlanDate(moment().format(moment.HTML5_FMT.DATE));
    switch (option) {
      case 1:
        dispatch(setTasks(repeatablePlans[0]))
        repeatablePlans[0].forEach((task) => {
          setTaskNotification(task);
        })
        break;
      case 2:
        dispatch(setTasks(repeatablePlans[0]))
        repeatablePlans[1].forEach((task) => {
          setTaskNotification(task);
        })
        break;
      case 3:
        dispatch(setTasks([]))
        break;
      default:
        dispatch(setTasks([]))
        break;
    }
  }
  
  return (
    <View style={styles.outerContainer}>
      <PlanRepeatModal
        showModal={showModal} 
        setShowModal={setShowModal} 
        returnSelectedOption={modalSelectedOption} 
        availablePlans={repeatablePlans}
        dayName={moment().format('dddd')}
      />
      <View style={styles.headerDateView}>
        <Text style={styles.headerDateText}>
          { moment().format('dddd') + ', ' + moment().format('DD-MM-YYYY') }
        </Text>
      </View>
      {
        (tasks && tasks.length) ? (
          <ScrollView contentContainerStyle={styles.container}>
            {
              unfinishedActivities.length ? (
                <View>
                  <Text>What you have to do</Text>
                </View>
              ) : (null)
            }
            {
              unfinishedActivities.map((task) => 
                <TaskListItem 
                  key={task.id} 
                  task={task} 
                  navigation={props.navigation}
                  taskAction={markTaskFinished}
                  deleteTask={deleteTask}
                /> 
              )
            }
            {
              finishedActivities.length ? (
                <View>
                  <Text>Done today</Text>
                </View>
              ) : (null)
            }
            {
              finishedActivities.map((task) => 
                <TaskListItem 
                  key={task.id} 
                  task={task} 
                  navigation={props.navigation} 
                  taskAction={markTaskUnfinished}
                  deleteTask={deleteTask}
                /> 
              )
            }
          </ScrollView>
        ) : (
          <View style={styles.taskStatusView}>
            <Text>You don't have anything planned for today.</Text>
          </View>
        )
      }
      <AddNewTaskButton navigation={props.navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    paddingHorizontal: 10,
  },
  taskStatusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerDateView: {
    paddingVertical: 10,
    paddingLeft: 10
  },
  headerDateText: {
    fontSize: 17
  }
});