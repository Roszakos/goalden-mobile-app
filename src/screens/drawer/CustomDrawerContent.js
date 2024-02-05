import { View, BackHandler, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1}} {...props}>
      <View style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
        <View>
          <DrawerItemList {...props} />
        </View>
        <View>
          <DrawerItem
            style={{marginBottom: 15}}
            label="Exit"
            onPress={() => BackHandler.exitApp() }
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}