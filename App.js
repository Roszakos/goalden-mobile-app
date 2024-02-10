import 'react-native-gesture-handler';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
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