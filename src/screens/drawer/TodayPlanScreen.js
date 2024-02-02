import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';
import { TodayPlanContext } from '../../contexts/TodayPlanContext';

export default function DailyPlanScreen(props) {
  const { tasks, setTasks, getTodayTasks } = useContext(TodayPlanContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getTodayTasks().then((response) => {
      setTasks(response);
      setActivities(response);
    })
  }, []);

  useEffect(() => {
    setActivities(tasks);
  }, [tasks])

  const displayTime = (time) => {
    if (time != 0) {
      const hours = parseInt(time[0] + time[1]);
      const minutes = time[2] + time[3];
      return hours + ':' + minutes;
    } 
    return '0:00';
  }
  
  return (
    <View style={styles.outerContainer}>
      {
        activities.length ? (
          <ScrollView contentContainerStyle={styles.container}>
          {
            activities.map((task) => {
              return(
                <View key={task.id}>
                  <TouchableHighlight onPress={() => {
                    props.navigation.navigate('AddNewTask', { headerTitle: 'Edit task', action: 'edit', task: task })
                  }}>
                    <View style={styles.listItemContainer}>
                      <View style={styles.listItemTimeView}>
                        <Text style={styles.listItemTimeText}>
                          {displayTime(task.time)}
                        </Text>
                      </View>
                      <View style={styles.listItemTitleView}>
                        <Text style={styles.listItemTitleText}>{task.title}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              )
            })
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
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 70,
    backgroundColor: 'green',
    marginTop: 10,
    paddingVertical: 10
  },
  listItemTimeView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    width: 90,
  },
  listItemTimeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  listItemTitleView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  listItemTitleText: {
    fontSize: 16,
  },
  listItemBottomView: {
    width: '100%',
    //alignItems: 'flex-end'
  },
  listItemBottomText: {
    color: 'red',
    //textTransform: 'uppercase'
  },
  taskStatusView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});