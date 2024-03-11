import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GoalListScreen from "../screens/goals/GoalListScreen";
import AddNewGoalScreen from "../screens/goals/AddNewGoalScreen";
import ActiveGoalsMain from "../screens/goals/ActiveGoalsMain";

const Stack = createStackNavigator();

export default function ActiveGoalsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ActiveGoalsMain"
        component={ActiveGoalsMain}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalListScreen}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})