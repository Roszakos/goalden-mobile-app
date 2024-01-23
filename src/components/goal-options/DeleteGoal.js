import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'
import { GoalListContext } from '../../contexts/GoalListContext';

export default function DeleteGoal({goalId, status, optionsItemTextStyle}) {
  const {
    activeGoalList, finishedGoalList, 
    setActiveGoalList, setFinishedGoalList, 
    storeActiveGoals, storeFinishedGoals
  } = useContext(GoalListContext);
  
  const deleteGoal = (goalId, status) => {
    if (status == "active") {
      const goal = activeGoalList.find((element) => element.id == goalId);
      let updatedActiveGoals = activeGoalList.slice();
      updatedActiveGoals.splice(updatedActiveGoals.indexOf(goal), 1);
      setActiveGoalList(updatedActiveGoals);
      storeActiveGoals(updatedActiveGoals);
    } else if (status == "finished") {
      const goal = finishedGoalList.find((element) => element.id == goalId);
      let updatedFinishedGoals = finishedGoalList.slice();
      updatedFinishedGoals.splice(updatedFinishedGoals.indexOf(goal), 1);
      setFinishedGoalList(updatedFinishedGoals);
      storeFinishedGoals(updatedFinishedGoals);
    }
  }

  return (
    <TouchableHighlight onPress={() => {
      deleteGoal(goalId, status);
    }}>
      <Text style={[optionsItemTextStyle, {color: 'red'}]}>
        Delete
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({})