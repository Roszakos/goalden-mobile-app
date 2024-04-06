import { StyleSheet, View, ImageBackground } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import "core-js/actual/array/group-by";

import { useSelector } from 'react-redux'

import GoalDetailsModal from '../GoalDetailsModal';
import AddNewGoalButton from '../../../components/AddNewGoalButton';
import { GoalListContext } from '../../../contexts/GoalListContext';
import GoalsCarousel from "../../../components/goals/GoalsCarousel";


export default function GoalListScreen(props) {
  //const { activeGoalList, finishedGoalList } = useContext(GoalListContext);
  const activeGoals = useSelector(state => state.activeGoals);

  const [highPriorityGoals, setHighPriorityGoals] = useState([]);
  const [lowPriorityGoals, setLowPriorityGoals] = useState([]);

  const [lowPriorityGoalsStatus, setLowPriorityGoalsStatus] = useState('Loading...');
  const [highPriorityGoalsStatus, setHighPriorityGoalsStatus] = useState('Loading...');

  const [editGoal, setEditGoal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const imageSrc = require('../../../../assets/goalden-background.webp');
  const theme = useTheme();

  const showGoalDetails = (goal) => {
    setEditGoal(goal);
    setShowModal(true);
  }

  useEffect(
    () => {
      if (props.route.params.category === 1) {
        const goals = activeGoals.list.slice();
        goals.sort((a, b) => {
          if (a.finishDate < b.finishDate) {
            return -1;
          } else if (b.finishDate < a.finishDate) {
            return 1;
          }
          return 0;
        })
        setLowPriorityGoals(goals.filter((goal) => goal.priority === 1))
        setHighPriorityGoals(goals.filter((goal) => goal.priority === 3))
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
        setLowPriorityGoals(goals.filter((goal) => goal.priority === 1))
        setHighPriorityGoals(goals.filter((goal) => goal.priority === 3))
      }
    }, 
    []
  );

  useEffect(() => {
    setLowPriorityGoalsStatus(lowPriorityGoals.length == 0 ? "You have no low priority goals." : "");
  }, [lowPriorityGoals]);

  useEffect(() => {
    setHighPriorityGoalsStatus(highPriorityGoals.length == 0 ? "You have no high priority goals." : "");
  }, [highPriorityGoals]);

  return (
    <ImageBackground 
      style={styles.outerContainer}
      source={imageSrc}
    >
      <View style={[styles.container, {backgroundColor: theme.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}]}>
        <View style={[styles.highGoalsView, styles.goalsView, {backgroundColor: theme.colors.backgroundOpacity}]}>
          {
            highPriorityGoalsStatus == "" ? (
              <View>
                <Text variant="titleLarge" style={[styles.carouselLabel, {color: 'red'}]}>High priority</Text>
                <GoalsCarousel goals={highPriorityGoals}/>
              </View>
            ) : (
              <Text>{highPriorityGoalsStatus}</Text>
            )
          }
        </View>
        <View style={[styles.lowGoalsView, styles.goalsView, {backgroundColor: theme.colors.backgroundOpacity}]}>
          <Text variant="titleLarge" style={[styles.carouselLabel, {color: 'orange'}]}>Low priority</Text>
          {
            lowPriorityGoalsStatus == "" ? (
              <GoalsCarousel showGoalDetails={showGoalDetails} goals={lowPriorityGoals}/>
            ) : (
              <Text style={{marginTop: 50}}>{lowPriorityGoalsStatus}</Text>
            )
          }
        </View>
        <GoalDetailsModal goal={editGoal} showModal={showModal} setShowModal={setShowModal} />
        <AddNewGoalButton showGoalDetails={showGoalDetails} />
      </View>
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
  },
  goalsView: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
    height: 300,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  highGoalsView: {
    borderTopColor: 'red',
    borderBottomColor: 'red',
  },
  lowGoalsView: {
    borderTopColor: 'orange',
    borderBottomColor: 'orange',
  },
  carouselLabel: {
    alignSelf: 'center',
    marginTop: 25,
    textTransform: 'uppercase',
    fontFamily: 'Josefin'
  }
});