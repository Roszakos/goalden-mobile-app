import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';
import TaskListItem from '../../components/day-plan/TaskListItem';
import DateDisplay from '../../components/DateDisplay';
import { storeDayPlans, getDayPlans, searchForPlanToRepeat } from '../../scripts/dayPlanScripts';
import PlanRepeatModal from '../../components/day-plan/PlanRepeatModal';



export default function DailyPlanScreen(props) {
  const { tasks, setTasks, getTodayTasks, storeTodayTasks, getLatestPlanDate, storeLatestPlanDate } = useContext(TodayPlanContext);
  const [finishedActivities, setFinishedActivities] = useState([]);
  const [unfinishedActivities, setUnfinishedActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [repeatablePlans, setRepeatablePlans] = useState([]);

  useEffect(() => {
    getLatestPlanDate().then((latestPlanDate) => {
      getTodayTasks().then((tasks) => {
        if (!latestPlanDate || latestPlanDate < moment().format(moment.HTML5_FMT.DATE)) {
          storeLatestPlanDate(moment().format(moment.HTML5_FMT.DATE));
          if (tasks.length && latestPlanDate) {
            getDayPlans().then((newDayPlans) => {
              newDayPlans.push({
                date: latestPlanDate,
                tasks: tasks
              })
              console.log(newDayPlans);

              const availablePlans = searchForPlanToRepeat(newDayPlans);
              if (availablePlans) {
                setRepeatablePlans(availablePlans);
                setShowModal(true);
              }
              storeTodayTasks([]);
              setTasks([]);
              storeDayPlans(newDayPlans);
            })
          } else {
            storeTodayTasks([]);
            setTasks([]);
          }
        } else {
          setTasks(tasks);
        }
      })
    })
    
  }, []);

  useEffect(() => {
    const finished = tasks.filter((item) => item.isDone);
    finished.sort((a, b) => {
      if (parseInt(a.time) < parseInt(b.time)) {
        return -1;
      } else if (parseInt(a.time) > parseInt(b.time)) {
        return 1;
      }
      return 0;
    })

    const unfinished = tasks.filter((item) => !item.isDone);
    unfinished.sort((a, b) => {
      if (parseInt(a.time) < parseInt(b.time)) {
        return -1;
      } else if (parseInt(a.time) > parseInt(b.time)) {
        return 1;
      }
      return 0;
    })

    setFinishedActivities(finished);
    setUnfinishedActivities(unfinished);
  }, [tasks])

  const markTaskFinished = (task) => {
    const taskIndex = tasks.indexOf(task);
    const changedTasks = tasks.slice();
    changedTasks[taskIndex].isDone = true;

    setTasks(changedTasks);
    storeTodayTasks(changedTasks);
  }

  const markTaskUnfinished = (task) => {
    const taskIndex = tasks.indexOf(task);
    const changedTasks = tasks.slice();
    changedTasks[taskIndex].isDone = false;

    setTasks(changedTasks);
    storeTodayTasks(changedTasks);
  }

  const deleteTask = (task) => {
    const changedTasks = tasks.slice();
    changedTasks.splice(tasks.indexOf(task), 1);

    setTasks(changedTasks);
    storeTodayTasks(changedTasks);
  }

  const modalSelectedOption = (option) => {
    switch (option) {
      case 1:
        setTasks(repeatablePlans[0]);
        storeTodayTasks(repeatablePlans[0]);
        break;
      case 2:
        setTasks(repeatablePlans[1]);
        storeTodayTasks(repeatablePlans[1]);
        break;
      default:
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
      />
      <View style={styles.headerDateView}>
        <Text style={styles.headerDateText}>
          <DateDisplay date={Date.now()}/>
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
    alignItems: 'center',
    paddingVertical: 10
  },
  headerDateText: {
    fontSize: 20
  }
});