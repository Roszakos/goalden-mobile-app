import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import DrawerNavigator from "./DrawerNavigator";
import GoalListScreen from "../screens/goals/GoalList/GoalListScreen"

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  return (
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
        name="GoalList"
        component={GoalListScreen}
        options={({route}) => ({
          headerTitle: route.params.header,
          headerShown: true
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})