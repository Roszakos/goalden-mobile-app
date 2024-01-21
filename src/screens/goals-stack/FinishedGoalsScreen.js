import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { GoalListContext } from '../../contexts/GoalListContext';

export default function FinishedGoalsScreen(props) {
  const { finishedGoalList, setFinishedGoalList, getFinishedGoals } = useContext(GoalListContext);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  useEffect(
    () => {
      getFinishedGoals().then((response) => {
        setFinishedGoalList(response);
        setGoalsStatus(response.length == 0 ?  "You haven't finished any goals yet." : "");
      });
      props.navigation.addListener("focus", () => DeviceEventEmitter.emit('event.changeDrawerNavigator', {shouldBeShown: true, enableSwipe: true}))
    },
    []
  );

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          finishedGoalList.length ? (
            finishedGoalList.map((goal) => {
              return (
                <View style={styles.listItem} key={goal.id}>
                  <Text style={styles.listItemText}>{goal.title}</Text>
                </View>
              )
            })
          ) : (
            <Text>{ goalsStatus }</Text>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  listItem: {
    height: 90,
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#d19d59',
  },
  listItemText: {
    color: '#fff'
  },
});