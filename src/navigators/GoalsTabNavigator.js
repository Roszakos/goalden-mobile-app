import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoalListScreen from '../screens/goals/GoalListScreen';
import FinishedGoalsScreen from '../screens/goals/FinishedGoalsScreen';

import ActiveGoalsStack from "./ActiveGoalsStack";
import FinishedGoalsStack from "./FinishedGoalsStack";

const Tab = createMaterialTopTabNavigator();

export default function GoalsTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="ActiveGoals">
      <Tab.Screen 
        name="ActiveGoals" 
        component={ActiveGoalsStack} 
        options={{ title: "Active"}}
      />
      <Tab.Screen 
        name="FinishedGoals" 
        component={FinishedGoalsStack} 
        options={{ title: "Finished"}}
      />
    </Tab.Navigator>
  );
}