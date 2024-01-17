import 'react-native-gesture-handler';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigators/DrawerNavigator';


export default function App() { 
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
