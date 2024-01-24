import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { GoalListContext } from '../../contexts/GoalListContext';
import ItemOptions from '../../components/goal-list-item/ItemOptions';

export default function FinishedGoalsScreen(props) {
  const { finishedGoalList, setFinishedGoalList, getFinishedGoals } = useContext(GoalListContext);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  // calculateDate() helper constants
  const TODAY = new Date();
  const DAYS_TO_ADD = 8 - TODAY.getDay();
	const END_OF_WEEK = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + DAYS_TO_ADD, 1);
  const END_OF_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1, 1);
  const END_OF_YEAR = new Date(TODAY.getFullYear() + 1, 0, 1, 1);

  useEffect(
    () => {
      getFinishedGoals().then((response) => {
        setFinishedGoalList(response);
      });
      props.navigation.addListener("focus", () => DeviceEventEmitter.emit('event.changeDrawerNavigator', {shouldBeShown: true, enableSwipe: true}))
      props.navigation.addListener("blur", () => DeviceEventEmitter.emit('event.hideOptions'))
    },
    []
  );

  useEffect(() => {
    setGoalsStatus(finishedGoalList.length == 0 ? "You haven't finished any goals yet." : "");
  }, [finishedGoalList])

  const calculateDate = (finishDate) => {
    if (finishDate) {
      finishDate = new Date(finishDate);
      const finishDateNoHours = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
      const todayNoHours = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
      if (finishDateNoHours < todayNoHours) {
        return 'time\'s up';
      } else if (finishDateNoHours == todayNoHours) {
        return 'today';
      } else if (finishDate <= END_OF_WEEK) {
        return 'this week';
      } else if (finishDate <= END_OF_MONTH) {
        return 'this month';
      } else if (finishDate <= END_OF_YEAR) {
        return 'this year';
      }
    }
    return 'date not specified';
  }

  const displayCreationDate = (createdAt) => {
    if (createdAt) {
      const creationDate = new Date(createdAt);
      let day = creationDate.getDate() < 10 ? '0' + creationDate.getDate() : creationDate.getDate();
      let month = (creationDate.getMonth() + 1) < 10 ? '0' + (parseInt(creationDate.getMonth()) + 1) : (parseInt(creationDate.getMonth()) + 1);
      return day + '-' + month + '-' + creationDate.getFullYear();
    }
    return 'date not specified';
  }

  const chooseGoalBgColor = (priority) => {
    let bgColor = 'gray';
    switch (priority) {
      case 1:
        bgColor = '#d4d13f'
        break;
      case 2:
        bgColor = '#d4963f'
        break;
      case 3:
        bgColor = '#db3e1f'
        break;
      default:
        break;
    }
    return bgColor;
  }

  const chooseHeaderBgColor = (priority) => {
    let bgColor = 'gray';
    switch (priority) {
      case 1:
        bgColor = '#d4c03f';
        break;
      case 2:
        bgColor = '#d4853f';
        break;
      case 3:
        bgColor = '#cf2219';
        break;
      default:
        break;
    }
    return bgColor;
  }

  const displayPriority = (priority) => {
    let textPriority = 'Not specified';
    switch (priority) {
      case 1:
        textPriority = 'Low';
        break;
      case 2:
        textPriority = 'Medium';
        break;
      case 3:
        textPriority = 'High';
        break;
      default:
        break;
    }
    return textPriority;
  }

  return (
    <View 
      style={styles.outerContainer}
      onStartShouldSetResponder={() => DeviceEventEmitter.emit("event.hideOptions")}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {
          finishedGoalList.length ? (
            finishedGoalList.map((goal) => {
              return (
                <View style={styles.listItemContainerView} key={goal.id}>
                  <View style={[styles.headerView, {backgroundColor: chooseHeaderBgColor(goal.priority)}]}>
                    <Text style={styles.headerText}>
                      GOAL
                    </Text>
                    <Text style={styles.headerText}>
                      {
                        goal.created ? 'Created ' + displayCreationDate(goal.created) : ''
                      }
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
                        <ItemOptions goalId={goal.id} status="finished"/>
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