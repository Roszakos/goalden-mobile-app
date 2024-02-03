import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';
import TaskListItem from '../../components/day-plan/TaskListItem';

export default function DailyPlanScreen(props) {
  const { tasks, setTasks, getTodayTasks, storeTodayTasks } = useContext(TodayPlanContext);
  const [finishedActivities, setFinishedActivities] = useState([]);
  const [unfinishedActivities, setUnfinishedActivities] = useState([]);

  useEffect(() => {
    getTodayTasks().then((response) => {
      setTasks(response);
    })
  }, []);

  useEffect(() => {
    const finished = tasks.filter((item) => item.isDone);
    const unfinished = tasks.filter((item) => !item.isDone)
    setFinishedActivities(finished);
    setUnfinishedActivities(unfinished);
  }, [tasks])

  const markTaskFinished = (task) => {
    const taskIndex = tasks.indexOf(task);
    const changedTasks = tasks.slice();
    task.isDone = true;
    changedTasks[taskIndex] = task;

    setTasks(changedTasks);
    storeTodayTasks(changedTasks);
  }

  const markTaskUnfinished = (task) => {
    const taskIndex = tasks.indexOf(task);
    const changedTasks = tasks.slice();
    task.isDone = false;
    changedTasks[taskIndex] = task;

    setTasks(changedTasks);
    storeTodayTasks(changedTasks);
  }
  
  return (
    <View style={styles.outerContainer}>
      {
        
        tasks.length ? (
          <ScrollView contentContainerStyle={styles.container}>
            <View>
              <Text>What you have to do</Text>
            </View>
          {
            unfinishedActivities.map((task) => <TaskListItem task={task} navigation={props.navigation} taskAction={markTaskFinished}/> )
          }
            <View>
              <Text>Done today</Text>
            </View>
          {
            finishedActivities.map((task) => <TaskListItem task={task} navigation={props.navigation} taskAction={markTaskUnfinished}/> )
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
});