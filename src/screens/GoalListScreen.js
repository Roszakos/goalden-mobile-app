import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React from 'react';
import AddNewGoalButton from '../components/AddNewGoalButton';

export default function GoalListScreen() {

  
  /* For testing only */
  function renderItems() {
    let renderedItems = [];
    for(let i=0; i<10; i++) {
      renderedItems.push(renderItem(i));
    }
    return renderedItems;
  }
  function renderItem(key) {
    return (
      <View style={styles.goalItem} key={key}>
        <Text style={styles.goalItemText}>Your goal</Text>
      </View>
    )
  }
  /* For testing only */


  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {
          renderItems()
        }
      </ScrollView>
      <AddNewGoalButton />
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    alignItems: 'center',
    position: 'relative',
  },
  goalItem: {
    height: 90,
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#d19d59',
  },
  goalItemText: {
    color: '#fff'
  },
});