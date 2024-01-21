import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function GoalViewScreen({route}) {
  const {goal} = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{goal.title}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2d5b3'
  },
  titleContainer: {
    //alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  titleText: {
    fontSize: 24,
    fontWeight: '500'
  }
})