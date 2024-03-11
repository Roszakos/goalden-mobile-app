import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./DrawerNavigator";
import AddNewGoalScreen from "../screens/goals/AddNewGoalScreen";
import AddNewTask from "../screens/drawer/AddNewTask";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
      />
      <Stack.Screen
        name="GoalDetails"
        component={AddNewGoalScreen}
      />
      <Stack.Screen
        name="TaskDetails"
        component={AddNewTask}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})