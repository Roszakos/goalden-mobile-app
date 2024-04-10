import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Icon, useTheme} from 'react-native-paper';
import React from 'react';
import moment from 'moment';

export default function TaskListItem({task, changeFinishState, showTaskDetails}) {
  const { colors } = useTheme();
  return (
      <Pressable 
        style={[styles.container, {backgroundColor: colors.lighterBackground}]}
        onPress={() => {
          showTaskDetails(task);
        }}  
      >
          {
            task.isFinished ? (
              <Pressable 
                style={styles.checkbox}
                onPress={() => {
                  changeFinishState(task, false);
                }}
              >
                <Icon source="checkbox-marked-outline" size={40} color="#30b02c"/>
              </Pressable>
            ) : (
              <Pressable 
                style={styles.checkbox}
                onPress={() => {
                  changeFinishState(task, true);
                }}
              >
                <Icon source="checkbox-blank-outline" size={40} />
              </Pressable>
            )
          }
          <View style={styles.taskTitleView}>
            <Text>
              {task.task}
            </Text>
          </View>
          <View style={[styles.taskTimeView, {borderColor: colors.background}]}>
            <Text>
              {
                task.time ? moment(task.time).format('HH:mm') : '-'
              }
            </Text>
          </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    minHeight: 60,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  taskTitleView: {
    flex: 1
  },
  checkbox: {
    padding: 6,
    paddingRight: 0
  },
  taskTimeView: {
    alignSelf: 'stretch',
    padding: 6,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 2
  }
})