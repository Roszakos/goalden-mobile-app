import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AddNewTaskButton from '../../components/day-plan/AddNewTaskButton';

export default function DailyPlanScreen() {
  const [activities, setActivities] = useState([
    {id: 0, time: '12:30', title: 'umyć buzie', endTime: '13:30'},
    {id: 1, time: '14:30', title: 'kodować', endTime: '15:30'},
    {id: 2, time: '15:30', title: 'skoczyć z balkonu', endTime: '16:30'},
  ]);
  
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.container}>
      {
        activities.length ? (
          activities.map((activity) => {
            return(
              <View key={activity.id}>
                <View style={styles.listItemContainer}>
                  <View style={styles.listItemTimeView}>
                    <Text style={styles.listItemTimeText}>{activity.time}</Text>
                  </View>
                  <View style={styles.listItemTitleView}>
                    <Text style={styles.listItemTitleText}>{activity.title}</Text>
                  </View>
                </View>
                {/* <View style={styles.listItemBottomView}>
                  <Text style={styles.listItemBottomText}>Finish by {activity.endTime}</Text>
                </View> */}
              </View>
            )
          })
        ) : (
          <Text>You don't have anything planned for today.</Text>
        )
      }
      </ScrollView>
      <AddNewTaskButton />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  container: {
    paddingHorizontal: 10,
  },
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'green',
    marginTop: 10,
  },
  listItemTimeView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1
  },
  listItemTimeText: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 10
  },
  listItemTitleView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  listItemTitleText: {
    fontSize: 16,
  },
  listItemBottomView: {
    width: '100%',
    //alignItems: 'flex-end'
  },
  listItemBottomText: {
    color: 'red',
    //textTransform: 'uppercase'
  }
});