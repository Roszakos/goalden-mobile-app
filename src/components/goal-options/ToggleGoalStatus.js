import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'
import { GoalListContext } from '../../contexts/GoalListContext';

export default function ToggleGoalStatus({goalId, status, optionsItemTextStyle}) {
  const { 
    activeGoalList, finishedGoalList, 
    setActiveGoalList, setFinishedGoalList, 
    storeActiveGoals, storeFinishedGoals 
  } = useContext(GoalListContext);

  const toggleStatusOptionText = status == 'active' ? 'Mark as finished' : 'Mark as active';

  const markGoalAsFinished = (goalId) => {
        const goal = activeGoalList.find((element) => element.id == goalId);
        let updatedActiveGoals = activeGoalList.slice();
        let updatedFinishedGoals = finishedGoalList.slice();

        updatedFinishedGoals.unshift(goal);
        updatedActiveGoals.splice(updatedActiveGoals.indexOf(goal), 1);

        setActiveGoalList(updatedActiveGoals);
        setFinishedGoalList(updatedFinishedGoals);

        storeActiveGoals(updatedActiveGoals);
        storeFinishedGoals(updatedFinishedGoals);
    }

    const markGoalAsActive = (goalId) => {
        const goal = finishedGoalList.find((element) => element.id == goalId);
        let updatedActiveGoals = activeGoalList.slice();
        let updatedFinishedGoals = finishedGoalList.slice();

        updatedActiveGoals.unshift(goal);
        updatedFinishedGoals.splice(updatedFinishedGoals.indexOf(goal), 1);

        setActiveGoalList(updatedActiveGoals);
        setFinishedGoalList(updatedFinishedGoals);

        storeActiveGoals(updatedActiveGoals);
        storeFinishedGoals(updatedFinishedGoals);
    }

  return (
    <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.4)" onPress={() => {
      if (status == "active") {
        markGoalAsFinished(goalId);
      } else if (status == "finished") {
        markGoalAsActive(goalId);
      }
    }}>
      <Text style={optionsItemTextStyle}>
        {
          toggleStatusOptionText
        }
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({})