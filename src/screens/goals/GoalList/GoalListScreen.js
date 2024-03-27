import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';

import AddNewGoalButton from '../../../components/AddNewGoalButton';
import GoalListSection from '../../../components/GoalListSection';
import { GoalListContext } from '../../../contexts/GoalListContext';
import { groupGoalsByFinishDate } from '../../../scripts/goalItemScripts';

export default function GoalListScreen(props) {
  const { activeGoalList, finishedGoalList } = useContext(GoalListContext);

  const [goalList, setGoalList] = useState(null);

  const [highPriorityGoals, setHighPriorityGoals] = useState(null);
  const [mediumPriorityGoals, setMediumPriorityGoals] = useState(null);
  const [lowPriorityGoals, setLowPriorityGoals] = useState(null);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  const imageSrc = require('../../../../assets/goalden-background.webp');
  const theme = useTheme();

  useEffect(
    () => {
      if (props.route.params.category === 1 || props.route.params.category === 2) {
        const goals = activeGoalList.slice();
        goals.sort((a, b) => {
          if (a.finishDate < b.finishDate) {
            return -1;
          } else if (b.finishDate < a.finishDate) {
            return 1;
          }
          return 0;
        })
        setGoalList(goals);
      } else {
        const goals = finishedGoalList.slice();
        goals.sort((a, b) => {
          if (a.finishDate < b.finishDate) {
            return -1;
          } else if (b.finishDate < a.finishDate) {
            return 1;
          }
          return 0;
        })
        setGoalList(goals);
      }
    }, 
    []
  );
  
  useEffect(() => {
    setGoalsStatus(activeGoalList.length == 0 ? "You have no active goals." : "");
    setGoalList(groupGoalsByFinishDate(activeGoalList));
  }, [activeGoalList])

  return (
    <ImageBackground 
      style={styles.outerContainer}
      source={imageSrc}
    >
      <ScrollView contentContainerStyle={[styles.container, {backgroundColor: theme.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}]}>
        {
          goalsStatus == "" ? (
            Object.keys(goalList).map(function (key, index) {
              if (goalList[key].list.length) {
                return <GoalListSection key={index} label={goalList[key].label} goalList={goalList[key].list} navigation={props.navigation} />
              }
            })
          ) : (
            <Text>{goalsStatus}</Text>
          )
        }
      </ScrollView>
      <AddNewGoalButton navigation={props.navigation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#a9d1cd',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 60
  }
});