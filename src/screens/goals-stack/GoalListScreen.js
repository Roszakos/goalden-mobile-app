import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AddNewGoalButton from '../../components/AddNewGoalButton';
import ItemOptions from '../../components/goal-list-item/ItemOptions';
import DateDisplay from '../../components/DateDisplay';
import { GoalListContext } from '../../contexts/GoalListContext';
import { GoalListGroupContext } from '../../contexts/GoalListGroupContext';
import { calculateDate, chooseGoalBgColor, displayPriority, chooseHeaderBgColor } from '../../scripts/goalItemScripts';

const changeGoalsGroup = (group) => {
  setShowGoalsGroup(group);
}


export default function GoalListScreen(props) {
  const { activeGoalList, setActiveGoalList, getActiveGoals } = useContext(GoalListContext);
  const { currentGroup } = useContext(GoalListGroupContext);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  useEffect(
    () => {
      getActiveGoals().then((response) => {
        setActiveGoalList(response);
      });
      props.navigation.addListener("focus", () => DeviceEventEmitter.emit('event.changeDrawerNavigator', {shouldBeShown: true, enableSwipe: true}))
      props.navigation.addListener("blur", () => DeviceEventEmitter.emit('event.hideOptions'))
    },
    []
  );
  
  useEffect(() => {
    setGoalsStatus(activeGoalList.length == 0 ? "You have no active goals." : "");
    props.navigation.setOptions({
        headerRight: () => <Text>XD</Text>
      })
  }, [activeGoalList])

  return (
    <View 
      style={styles.outerContainer}
      onStartShouldSetResponder={() => DeviceEventEmitter.emit("event.hideOptions")}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {
          activeGoalList.length ? (
            activeGoalList.map((goal) => {
              if (currentGroup === 0 || goal.priority == currentGroup)
              {
                return (
                  <View style={styles.listItemContainerView} key={goal.id}>
                    <View style={[styles.headerView, {backgroundColor: chooseHeaderBgColor(goal.priority)}]}>
                      <Text style={styles.headerText}>
                        GOAL
                      </Text>
                      <Text style={styles.headerText}>
                        {
                          goal.created ? 'Created ' : ''
                        }
                        <DateDisplay date={goal.created} />
                      </Text>
                    </View>
                    <TouchableHighlight 
                      onPress={() => {
                        DeviceEventEmitter.emit("event.changeDrawerNavigator", { shouldBeShown: false, enableSwipe: false });
                        props.navigation.navigate("GoalView", {goal: goal, title: goal.title});
                      }}
                      style={styles.listItemTouchable} 
                    >
                      <View style={[styles.listItemView, {backgroundColor: chooseGoalBgColor(goal.priority)}]}>
                        <View style={styles.listItemHeader}>
                          <Text style={styles.listItemText}>{goal.title}</Text>
                          <ItemOptions goalId={goal.id} status="active" />
                        </View>
                        <View style={styles.listItemBottomView}>
                          <View style={styles.goalFinishDateView}>
                            <Text style={styles.goalDetailsHeader}>
                              DEADLINE
                            </Text>
                            <Text style={styles.goalDetailsText}>
                              {
                                goal.finishDate ? calculateDate(goal.finishDate) : ''
                              }
                            </Text>
                          </View>

                          <View style={styles.goalFinishDateView}>
                            <Text style={styles.goalDetailsHeader}>
                              PRIORITY
                            </Text>
                            <Text style={styles.goalDetailsText}>
                              {
                                displayPriority(goal.priority)
                              }
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                )
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
  },
  listItemContainerView: {
    width: '100%',
  },
  listItemTouchable: {
    width: '100%',
  },
  listItemText: {
    fontSize: 20,
    width: '80%',
    fontWeight: '700',
    lineHeight: 22
  },
  listItemView: {
    width: '100%',
    minHeight: 120,
    paddingVertical: 4,
    paddingHorizontal: 8,
    opacity: 0.9,
    justifyContent: 'space-between'
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 12,
  },
  headerView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  goalDetailsHeader: {
    fontWeight: '700',
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 10,
    backgroundColor: '#000',
    textAlign: 'center',
    color: '#fff',
    opacity: 0.9
  },
  goalDetailsText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'red',
    textAlign: 'center',
    backgroundColor: '#000',
    opacity: 0.7
  },
  listItemBottomView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingTop: 30
  },
  goalPriorityText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#fff',
    alignSelf: 'flex-start',
    backgroundColor: '#000',
    opacity: 0.8,
    borderRadius: 20,
  },
});