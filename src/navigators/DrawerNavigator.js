import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodayPlanScreen from '../screens/drawer/TodayPlanScreen';
import GoalsOrderPicker from '../components/GoalsOrderPicker';
import GoalListGroupContextProvider from '../contexts/GoalListGroupContext';
import AddNewGoalScreen from '../screens/goals/AddNewGoalScreen';
import GoalsTabNavigator from './GoalsTabNavigator';
import GoalListContextProvider from '../contexts/GoalListContext';
import TodayPlanContextProvider from '../contexts/TodayPlanContext';
import AddNewTask from '../screens/drawer/AddNewTask';
import CustomDrawerContent from '../screens/drawer/CustomDrawerContent';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <GoalListGroupContextProvider>
      <GoalListContextProvider>
        <TodayPlanContextProvider>
          <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            backBehavior="history"
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
              name="GoalsTab" 
              component={GoalsTabNavigator} 
              options={{ 
                title: 'Your Goals', 
                drawerLabel: 'My Goals',
                headerRight: () => <GoalsOrderPicker />
              }}
            />
            <Drawer.Screen 
              name="TodayPlan" 
              component={TodayPlanScreen} 
              options={{ title: 'Your plan for today', drawerLabel: 'Today\'s plan'}}
            />
          </Drawer.Navigator>
        </TodayPlanContextProvider>
      </GoalListContextProvider>
    </GoalListGroupContextProvider>
  );
}