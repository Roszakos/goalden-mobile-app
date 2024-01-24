import { StyleSheet, Text, TouchableHighlight, DeviceEventEmitter } from 'react-native'
import React, { useContext } from 'react';
import { GoalListContext } from '../../contexts/GoalListContext';
import { useNavigation } from '@react-navigation/native';

export default function EditGoal({goalId, status, optionsItemTextStyle}) {
  const {activeGoalList, finishedGoalList} = useContext(GoalListContext);
  const navigation = useNavigation();

  const editGoal = (goalId, status) => {
    let goal;
    if (status == "active") {
      goal = activeGoalList.find((element) => element.id == goalId);
    } else if (status == "finished") {
      goal = finishedGoalList.find((element) => element.id == goalId);
    }
    DeviceEventEmitter.emit("event.changeDrawerNavigator", { shouldBeShown: false, enableSwipe: false });
    navigation.navigate('AddNewGoal', {goal: goal, action: 'edit', headerTitle: 'Edit goal'});
  }
  
  return (
    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.4)" onPress={() => {
      editGoal(goalId, status);
    }}>
      <Text style={optionsItemTextStyle}>
        Edit
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({})