import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GoalListScreen from '../screens/GoalListScreen';
import DailyPlanScreen from '../screens/DailyPlanScreen';
import TouchableTest from '../screens/TouchableTest';

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
      }}
  >
      <Drawer.Screen name="GoalList" component={GoalListScreen} options={{ title: 'Your Goals', drawerLabel: 'My Goals'}}/>
      <Drawer.Screen name="DailyPlan" component={DailyPlanScreen} options={{ title: 'Daily Plan'}}/>
      <Drawer.Screen name="TouchableTest" component={TouchableTest} options={{ title: 'TouchableTest'}}/>
    </Drawer.Navigator>
  );
}