import { createStackNavigator } from '@react-navigation/stack';
import AddNewGoalScreen from '../screens/goals-stack/AddNewGoalScreen'
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import GoalListContextProvider from '../contexts/GoalListContext';
import GoalsTabNavigator from './GoalsTabNavigator';

const Stack = createStackNavigator();

export default function GoalsStackNavigator(props) {
	DeviceEventEmitter.addListener("event.changeDrawerNavigator", ({shouldBeShown, enableSwipe}) =>  {
		props.navigation.setOptions({ headerShown: shouldBeShown, swipeEnabled: enableSwipe });
	});
  return (
    <GoalListContextProvider>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
              backgroundColor: '#e86035',
            },
            headerTitleStyle: {
              fontSize: 22,
            }
        }}
      >
        <Stack.Screen 
          name="GoalList" 
          component={GoalsTabNavigator} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="AddNewGoal" 
          component={AddNewGoalScreen} 
          options={({route}) => ({title: route.params.headerTitle})}
        />
      </Stack.Navigator>
    </GoalListContextProvider>
  );
}

const styles = StyleSheet.create({});