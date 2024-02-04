import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';
import React, { useState, useContext, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';
import TaskListItem from '../../components/day-plan/TaskListItem';
import DateDisplay from '../../components/DateDisplay';

export default function DailyPlanScreen(props) {
  const { tasks, setTasks, getTodayTasks, storeTodayTasks, getLatestPlanDate, storeLatestPlanDate } = useContext(TodayPlanContext);
  const [finishedActivities, setFinishedActivities] = useState([]);
  const [unfinishedActivities, setUnfinishedActivities] = useState([]);

  useEffect(() => {
    getLatestPlanDate().then((latestPlanDate) => {
      if (!latestPlanDate || latestPlanDate < moment().format('DD-MM-YYYY')) {
        storeLatestPlanDate(moment().format('DD-MM-YYYY'));
        storeTodayTasks(null);
        setTasks([]);
      } else {
        getTodayTasks().then((tasks) => {
          setTasks(tasks);
        })
      }
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
  
  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerDateView}>
        <Text style={styles.headerDateText}>
          <DateDisplay date={Date.now()}/>
        </Text>
      </View>
      {
        tasks.length ? (
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <Text>What you have to do</Text>
            </View>
            {
              unfinishedActivities.map((task) => <TaskListItem key={task.id} task={task} navigation={props.navigation} taskAction={markTaskFinished}/> )
            }
            <View>
              <Text>Done today</Text>
            </View>
            {
              finishedActivities.map((task) => <TaskListItem key={task.id} task={task} navigation={props.navigation} taskAction={markTaskUnfinished}/> )
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