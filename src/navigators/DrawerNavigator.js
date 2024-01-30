import { createDrawerNavigator } from '@react-navigation/drawer';
import GoalsStackNavigator from './GoalsStackNavigator';
import TodayPlanScreen from '../screens/drawer/TodayPlanScreen';
import GoalsOrderPicker from '../components/GoalsOrderPicker';
import GoalListGroupContextProvider from '../contexts/GoalListGroupContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <GoalListGroupContextProvider>
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
      <Drawer.Screen 
        name="GoalStackNavigator" 
        component={GoalsStackNavigator} 
        options={{ 
          title: 'Your Goals', 
          drawerLabel: 'My Goals',
          headerRight: () => <GoalsOrderPicker />
        }}
      />
      <Drawer.Screen 
        name="TodayPlan" 
        component={TodayPlanScreen} 
        options={{ title: 'Today\'s plan'}}
      />
    </Drawer.Navigator>
    </GoalListGroupContextProvider>
  );
}