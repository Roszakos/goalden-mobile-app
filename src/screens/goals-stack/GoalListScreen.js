import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AddNewGoalButton from '../../components/AddNewGoalButton';
import { GoalListContext } from '../../contexts/GoalListContext';

export default function GoalListScreen(props) {
  const { activeGoalList, setActiveGoalList, getActiveGoals } = useContext(GoalListContext);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  useEffect(() => {
    getActiveGoals().then((response) => {
      setActiveGoalList(response);
      setGoalsStatus(response.length == 0 ?  "You have no active goals." : "");
    });
  }, []);

  useEffect(() => {
    console.log(activeGoalList);
    console.log('goallist')
  }, [activeGoalList]);

  React.useEffect(
    () => {
      // props.navigation.addListener("focus", () => {
      //   getActiveGoals().then((response) => {
      //     setGoalList(response);
      //     setGoalsStatus(response.length == 0 ?  "You have no active goals." : "");
      //   });
      // })
      props.navigation.addListener("focus", () => DeviceEventEmitter.emit('event.changeDrawerNavigator', {shouldBeShown: true, enableSwipe: true}))
    },
    []
  );

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          activeGoalList.length ? (
            activeGoalList.map((goal) => {
              return (
                <View style={styles.listItem} key={goal.id}>
                  <Text style={styles.listItemText}>{goal.title}</Text>
                </View>
              )
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