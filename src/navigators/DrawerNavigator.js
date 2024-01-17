import { createDrawerNavigator } from '@react-navigation/drawer';
import GoalsStackNavigator from './GoalsStackNavigator';
import DailyPlanScreen from '../screens/drawer/DailyPlanScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="GoalList"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#d49b39',
          width: 240,
        },
        swipeEdgeWidth: 100
      }}
    >
      <Drawer.Screen name="GoalStackNavigator" component={GoalsStackNavigator} options={{ title: 'Your Goals', drawerLabel: 'My Goals'}}/>
      <Drawer.Screen name="DailyPlan" component={DailyPlanScreen} options={{ title: 'Daily Plan'}}/>
    </Drawer.Navigator>
  );
}