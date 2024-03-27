import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// Contexts
import GoalListContextProvider from '../contexts/GoalListContext';
import TodayPlanContextProvider from '../contexts/TodayPlanContext';

// Screens
import DrawerNavigator from "./DrawerNavigator";
import AddNewGoalScreen from "../screens/goals/AddNewGoalScreen";
import AddNewTask from "../screens/drawer/AddNewTask";
import GoalListScreen from "../screens/goals/GoalList/GoalListScreen"

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
      <GoalListContextProvider>
        <TodayPlanContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
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
            <Stack.Screen
              name="GoalList"
              component={GoalListScreen}
              options={({route}) => ({
                headerTitle: route.params.header,
                headerShown: true
              })}
            />
          </Stack.Navigator>
        </TodayPlanContextProvider>
      </GoalListContextProvider>
  )
}

const styles = StyleSheet.create({})