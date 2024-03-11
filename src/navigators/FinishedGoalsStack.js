import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GoalListScreen from "../screens/goals/GoalListScreen";
import AddNewGoalScreen from "../screens/goals/AddNewGoalScreen";
import FinishedGoalsMain from "../screens/goals/FinishedGoalsMain";

const Stack = createStackNavigator();

export default function ActiveGoalsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="FinishedGoalsMain"
        component={FinishedGoalsMain}
      />
      <Stack.Screen
        name="GoalList"
        component={GoalListScreen}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})