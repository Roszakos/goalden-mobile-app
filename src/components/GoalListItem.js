import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import ItemOptions from './goal-list-item/ItemOptions';
import DateDisplay from './DateDisplay';
import { calculateDate, chooseGoalBgColor, displayPriority, chooseHeaderBgColor, groupGoalsByFinishDate } from '../scripts/goalItemScripts';

export default function GoalListItem({goal, navigation}) {
  return (
    <View style={styles.listItemContainerView}>
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
          navigation.navigate("AddNewGoal", {goal: goal, action: 'edit', headerTitle: 'Edit goal', isFinished: false});
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

const styles = StyleSheet.create({
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
})