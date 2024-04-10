import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import TaskListItem from '../../components/day-plan/TaskListItem';
import { storeDayPlans, getDayPlans, searchForPlanToRepeat, sortTasks, setTaskNotification } from '../../scripts/dayPlanScripts';
import PlanRepeatModal from '../../components/day-plan/PlanRepeatModal';
import { cancelNotification } from '../../scripts/notificationScripts';

// My Components
import TaskDetailsModal from '../../components/day-plan/TaskDetailsModal';

import { useSelector, useDispatch } from 'react-redux';
import { set as setTasks, add as addTask, update, destroy} from '../../features/tasks/tasksSlice';
import { set as setLatestPlanDate } from '../../features/tasks/latestPlanDateSlice';
import { add as addPreviousPlan } from '../../features/tasks/previousDaysTasksSlice';


export default function DailyPlanScreen(props) {
  //const { tasks, setTasks, getTodayTasks, storeTodayTasks, getLatestPlanDate, storeLatestPlanDate } = useContext(TodayPlanContext);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const tasks = useSelector(state => state.tasks.list);
  const latestPlanDate = useSelector(state => state.latestPlanDate.value);
  const previousDaysTasks = useSelector(state => state.previousDaysTasks.list);

  const [editTask, setEditTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [finishedActivities, setFinishedActivities] = useState([]);
  const [unfinishedActivities, setUnfinishedActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [repeatablePlans, setRepeatablePlans] = useState([]);

  useEffect(() => {
        if (latestPlanDate) {
          if (latestPlanDate < moment().format(moment.HTML5_FMT.DATE)) {
            if (tasks.length) {
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
            }
          }
        } else {
          dispatch(setLatestPlanDate(moment().format(moment.HTML5_FMT.DATE)))
        }
  }, []);

  useEffect(() => {
    const sorted = sortTasks(tasks);
    setFinishedActivities(sorted[0]);
    setUnfinishedActivities(sorted[1]);
  }, [tasks])

  useEffect(() => {
  }, [finishedActivities, unfinishedActivities])

  const showTaskDetails = (task) => {
    setEditTask(task);
    setShowTaskModal(true);
  }

  const changeFinishState = (task, finishState) => {
    dispatch(update({
      id: task.id,
      task: task.task,
      time: task.time,
      duration: task.duration,
      isFinished: finishState
    }))
  }

  const deleteTask = (task) => {
    cancelNotification(task.id);
    dispatch(destroy(task));
  }

  const modalSelectedOption = (option) => {
    setLatestPlanDate(moment().format(moment.HTML5_FMT.DATE));
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
      <View style={[styles.headerDateView, {backgroundColor: colors.lighterBackground}]}>
        <Text style={styles.headerDateText}>
          { moment().format('dddd') + ', ' + moment().format('DD-MM-YYYY') }
        </Text>
      </View>
      {
        tasks.length ? (
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.tasksContainer}>
              <View style={[styles.tasksLabel, {backgroundColor: colors.primary}]}>
                <Text style={styles.tasksLabelText}>What you have to do</Text>
              </View>
              <View style={[styles.tasksContent, {borderColor: colors.primary}]}>
                {
                  unfinishedActivities.map((task) => 
                    <TaskListItem 
                      key={task.id} 
                      task={task} 
                      changeFinishState={changeFinishState}
                      showTaskDetails={showTaskDetails}
                    /> 
                  )
                }
              </View>
            </View>
            <View style={[styles.tasksContainer, {opacity: 0.6}]}>
              <View style={[styles.tasksLabel, {backgroundColor: colors.primary}]}>
                <Text style={styles.tasksLabelText}>Done today</Text>
              </View>
              <View style={[styles.tasksContent, {borderColor: colors.primary}]}>
                {
                  finishedActivities.map((task) => 
                    <TaskListItem 
                      key={task.id} 
                      task={task} 
                      changeFinishState={changeFinishState}
                      showTaskDetails={showTaskDetails}
                    /> 
                  )
                }
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.taskStatusView}>
            <Text>You don't have anything planned for today.</Text>
          </View>
        )
      }
      <TaskDetailsModal 
          task={editTask} 
          showModal={showTaskModal} 
          setShowModal={setShowTaskModal} 
        />
      <AddNewTaskButton showTaskDetails={showTaskDetails} />
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
    fontFamily: 'Josefin',
    fontSize: 17
  },
  tasksContainer: {
    width: '100%',
    minHeight: 190,
    marginTop: 20
  },
  tasksContent: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 10,
    paddingTop: 0
  },
  tasksLabel: {
    alignSelf: 'flex-start',
    padding: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  tasksLabelText: {
    fontFamily: 'Josefin',
    fontSize: 16
  }
});