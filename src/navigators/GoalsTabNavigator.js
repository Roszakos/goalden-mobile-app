import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GoalListScreen from '../screens/goals-stack/GoalListScreen';
import FinishedGoalsScreen from '../screens/goals-stack/FinishedGoalsScreen';

const Tab = createMaterialTopTabNavigator();

export default function GoalsTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="ActiveGoals">
      <Tab.Screen 
        name="ActiveGoals" 
        component={GoalListScreen} 
        options={{ title: "Active"}}
      />
      <Tab.Screen 
        name="FinishedGoals" 
        component={FinishedGoalsScreen} 
        options={{ title: "Finished"}}
      />
    </Tab.Navigator>
  );
}