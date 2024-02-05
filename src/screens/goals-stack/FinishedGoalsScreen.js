import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { GoalListContext } from '../../contexts/GoalListContext';
import { GoalListGroupContext } from '../../contexts/GoalListGroupContext';
import GoalListItem from '../../components/GoalListItem';

export default function FinishedGoalsScreen(props) {
  const { finishedGoalList, setFinishedGoalList, getFinishedGoals } = useContext(GoalListContext);
  const { currentGroup } = useContext(GoalListGroupContext);

  const [goalList, setGoalList] = useState([]);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  useEffect(
    () => {
      getFinishedGoals().then((response) => {
          response.sort((a, b) => {
            if (a.finishDate < b.finishDate) {
              return -1;
            } else if (b.finishDate < a.finishDate) {
              return 1;
            }
            return 0;
          })
        setFinishedGoalList(response);
        setGoalList(response);
      });
      props.navigation.addListener("blur", () => DeviceEventEmitter.emit('event.hideOptions'))
    },
    []
  );

  useEffect(() => {
    setGoalsStatus(finishedGoalList.length == 0 ? "You haven't finished any goals yet." : "");
    const sortedFinishedGoalList = finishedGoalList.slice();
    sortedFinishedGoalList.sort((a, b) => {
      if (a.finishDate < b.finishDate) {
        return -1;
      } else if (b.finishDate < a.finishDate) {
        return 1;
      }
      return 0;
    });

    setGoalList(sortedFinishedGoalList);
  }, [finishedGoalList])

  return (
    <View 
      style={styles.outerContainer}
      onStartShouldSetResponder={() => DeviceEventEmitter.emit("event.hideOptions")}
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