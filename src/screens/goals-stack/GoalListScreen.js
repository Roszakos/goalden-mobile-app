import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AddNewGoalButton from '../../components/AddNewGoalButton';
import { GoalListContext } from '../../contexts/GoalListContext';
import { GoalListGroupContext } from '../../contexts/GoalListGroupContext';
import { groupGoalsByFinishDate } from '../../scripts/goalItemScripts';

import GoalListItem from '../../components/GoalListItem';

export default function GoalListScreen(props) {
  const { activeGoalList, setActiveGoalList, getActiveGoals } = useContext(GoalListContext);
  const { currentGroup } = useContext(GoalListGroupContext);

  const [goalList, setGoalList] = useState([]);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  useEffect(
    () => {
      getActiveGoals().then((response) => {
        response.sort((a, b) => {
          if (a.finishDate < b.finishDate) {
            return -1;
          } else if (b.finishDate < a.finishDate) {
            return 1;
          }
          return 0;
        })
        setActiveGoalList(response);
        setGoalList(response);
      });
      props.navigation.addListener("blur", () => DeviceEventEmitter.emit('event.hideOptions'))
    },
    []
  );
  
  useEffect(() => {
    setGoalsStatus(activeGoalList.length == 0 ? "You have no active goals." : "");
    const sortedActiveGoalList = activeGoalList.slice();
    sortedActiveGoalList.sort((a, b) => {
      if (a.finishDate < b.finishDate) {
        return -1;
      } else if (b.finishDate < a.finishDate) {
        return 1;
      }
      return 0;
    });

    setGoalList(sortedActiveGoalList);
    groupGoalsByFinishDate(sortedActiveGoalList);
  }, [activeGoalList])

  return (
    <View 
      style={styles.outerContainer}
      onStartShouldSetResponder={ () => DeviceEventEmitter.emit("event.hideOptions") }
    >
      <ScrollView contentContainerStyle={styles.container}>
        {
          goalList.length ? (
            goalList.map((goal) => {
              if (currentGroup === 0 || goal.priority == currentGroup)
              {
                return <GoalListItem key={goal.id} goal={goal} navigation={props.navigation} />
              }
            })
          ) : (
            <Text>{goalsStatus}</Text>
          )
        }
      </ScrollView>
      <AddNewGoalButton navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#a9d1cd',
  },
  container: {
    alignItems: 'center',
    position: 'relative',
    padding: 0,
    paddingBottom: 60
  }
});