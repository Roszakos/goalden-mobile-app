import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

export default function TaskListItem({navigation, task, taskAction, deleteTask}) {

  const displayTime = (time) => {
    if (time != 0) {
      const hours = parseInt(time[0] + time[1]);
      const minutes = time[2] + time[3];
      return hours + ':' + minutes;
    } 
    return '0:00';
  }

  return (
    <View>
      <TouchableHighlight 
        style={styles.listItemTouchable}
        onPress={() => {
          navigation.navigate('AddNewTask', { headerTitle: 'Edit task', action: 'edit', task: task })
        }}
      >
        <View style={[styles.listItemContainer, {backgroundColor: task.isDone ? '#d4ac3f' : '#1ed463'}]}>
          <View style={styles.listItemTimeView}>
            <Text style={styles.listItemTimeText}>
              {displayTime(task.time)}
            </Text>
          </View>
          <View style={styles.taskRightView}>
            <View style={styles.listItemTitleView}>
              <Text style={styles.listItemTitleText}>{task.title}</Text>
            </View>
            <View style={styles.taskActionsView}>
              <TouchableHighlight
                style={styles.taskDoneButtonTouchable}
                onPress={() => {
                  taskAction(task);
                }}
              >
                <View style={[styles.taskDoneButtonView, {backgroundColor: task.isDone ? '#16ba1f' : '#cfad63'}]}>
                  <Text>
                    {
                      task.isDone ? 'REVIVE' : 'DONE'
                    }
                  </Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight 
                style={styles.taskDeleteTouchable}
                onPress={() => {
                  deleteTask(task);
                }}
              >
                <View style={styles.taskDeleteView}>
                  <FontAwesome5 
                    name="trash-alt" 
                    size={24} 
                    color="black" 
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
    listItemTouchable: {
    marginTop: 10,
  },
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 70,
    backgroundColor: 'green',
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
  taskRightView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  taskDoneButtonView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskDoneButtonTouchable: {
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  taskActionsView: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%',
    gap: 4,
    marginRight: 10
  },
  taskDeleteTouchable: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  taskDeleteView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  }
})