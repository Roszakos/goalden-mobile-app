import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodayPlanScreen from '../screens/drawer/TodayPlanScreen';
import GoalsOrderPicker from '../components/GoalsOrderPicker';
import GoalListGroupContextProvider from '../contexts/GoalListGroupContext';
import AddNewGoalScreen from '../screens/goals-stack/AddNewGoalScreen';
import GoalsTabNavigator from './GoalsTabNavigator';
import GoalListContextProvider from '../contexts/GoalListContext';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <GoalListGroupContextProvider>
      <GoalListContextProvider>
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
            name="GoalList" 
            component={GoalsTabNavigator} 
            options={{ 
              title: 'Your Goals', 
              drawerLabel: 'My Goals',
              headerRight: () => <GoalsOrderPicker />
            }}
          />
          <Drawer.Screen 
            name="AddNewGoal" 
            component={AddNewGoalScreen} 
            options={({route, navigation}) => ({ 
              title: route.params ? route.params.headerTitle : 'Set new goal', 
              drawerItemStyle: {display: 'none'},
              swipeEnabled: false,
              headerLeft: () => (
                <TouchableWithoutFeedback onPress={() => {
                  navigation.goBack()
                }}>
                  <Ionicons style={{paddingLeft: 10}} name="arrow-back" size={26} color="black" />
                </TouchableWithoutFeedback>
              )
            })}
          />  
          <Drawer.Screen 
            name="TodayPlan" 
            component={TodayPlanScreen} 
            options={{ title: 'Today\'s plan'}}
          />
        </Drawer.Navigator>
      </GoalListContextProvider>
    </GoalListGroupContextProvider>
  );
}