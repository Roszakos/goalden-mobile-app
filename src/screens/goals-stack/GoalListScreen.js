import { StyleSheet, View, Text, ScrollView, DeviceEventEmitter, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AddNewGoalButton from '../../components/AddNewGoalButton';
import { GoalListContext } from '../../contexts/GoalListContext';

export default function GoalListScreen(props) {
  const { activeGoalList, setActiveGoalList, getActiveGoals } = useContext(GoalListContext);
  const [goalsStatus, setGoalsStatus] = useState('Loading...');

  // calculateDate() helper constants
  const TODAY = new Date();
  const DAYS_TO_ADD = 8 - TODAY.getDay();
	const END_OF_WEEK = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + DAYS_TO_ADD, 1);
  const END_OF_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 1, 1);
  const END_OF_YEAR = new Date(TODAY.getFullYear() + 1, 0, 1, 1);

  useEffect(
    () => {
      getActiveGoals().then((response) => {
        setActiveGoalList(response);
        setGoalsStatus(response.length == 0 ? "You have no active goals." : "");
      });
      props.navigation.addListener("focus", () => DeviceEventEmitter.emit('event.changeDrawerNavigator', {shouldBeShown: true, enableSwipe: true}))
    },
    []
  );

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

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {
          activeGoalList.length ? (
            activeGoalList.map((goal) => {
              return (
                <TouchableHighlight 
                  onPress={() => {
                    DeviceEventEmitter.emit("event.changeDrawerNavigator", { shouldBeShown: false, enableSwipe: false });
                    props.navigation.navigate("GoalView", {goal: goal, title: goal.title});
                  }}
                  key={goal.id}
                  style={styles.listItem} 
                >
                  <View style={[styles.listItemView, {backgroundColor: chooseGoalBgColor(goal.priority)}]}>
                    <View style={styles.listItemHeader}>
                      <Text style={styles.listItemText}>{goal.title}</Text>
                      <Text>
                        {
                          goal.created ? displayCreationDate(goal.created) : ''
                        }
                      </Text>
                    </View>
                    <Text>
                      {
                        goal.finishDate ? calculateDate(goal.finishDate) : ''
                      }
                    </Text>
                  </View>
                </TouchableHighlight>
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
    padding: 2,
    paddingBottom: 60
  },
  listItem: {
    width: '100%',
    marginTop: 2,
  },
  listItemText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700'
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
    justifyContent: 'space-between'
  }
});