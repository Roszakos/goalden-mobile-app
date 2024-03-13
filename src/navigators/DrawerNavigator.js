import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../screens/drawer/CustomDrawerContent';

import ActiveGoalsMain from '../screens/goals/ActiveGoalsMain'
import TodayPlanScreen from '../screens/drawer/TodayPlanScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    
          <Drawer.Navigator 
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            backBehavior="history"
            initialRouteName="GoalCategories"
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#d49b39',
                width: 240,
              },
              swipeEdgeWidth: 100
            }}
          >
            <Drawer.Screen 
              name="GoalCategories" 
              component={ActiveGoalsMain} 
              options={{ 
                title: 'Your Goals', 
                drawerLabel: 'My Goals',
              }}
            />
            <Drawer.Screen 
              name="TodayPlan" 
              component={TodayPlanScreen} 
              options={{ title: 'Your plan for today', drawerLabel: 'Today\'s plan'}}
            />
          </Drawer.Navigator>
        
  );
}