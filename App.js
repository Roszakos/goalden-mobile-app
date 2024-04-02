import 'react-native-gesture-handler';
import { GestureHandlerRootView  } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, PaperProvider, configureFonts } from 'react-native-paper';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import Notification from './src/scripts/notificationScripts';
import { useState } from 'react';
import { useFonts } from 'expo-font';



export default function App() { 
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);

  const [fontsLoaded] = useFonts({
    'Josefin': require('./assets/fonts/JosefinSans-SemiBold.ttf'),
    'TirtoWritter': require('./assets/fonts/TirtoWritterRegular-Eajrl.ttf'),
  });
  
  const LightTheme = {
    ...DefaultTheme,
    dark: false, // Ustawienie dla jasnego motywu
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff', // Jasne tło
      backgroundOpacity: 'rgba(255,255,255,0.7)', 
      lighterBackground: '#f0f0f0', // Bardziej jasny kolor dla tła
      surface: '#ffffff', // Jasny kolor dla powierzchni, utrzymujący czystość i świeżość
      lighterSurface: '#dadce3',
      primary: '#ee80ff', // Głęboki niebieski
      darkerPrimary: '#ca80ff',
      secondary: '#88d1cf', // Ciemny róż
      accent: '#cad44a',  // Przykładowy kolor akcentu, dostosowany dla lepszej widoczności
      text: '#000000', // Kolor tekstu dla kontrastu z jasnym tłem
      onSurface: '#000000', // Kolor na powierzchniach, np. tekst na kartach, dla lepszego kontrastu
      disabled: '#c7c7c7', // Jasny kolor elementów nieaktywnych
      placeholder: '#747474', // Kolor tekstu placeholdera, ciemniejszy dla lepszej widoczności
      backdrop: '#ffffff', // Jasny kolor tła modalu, menu, itp., dla lekkiego efektu
      notification: '#ff80ab', // Kolor tła powiadomień, niezmieniony
      card: "#ffffff", // Jasny kolor kart
      border: "#e0e0e0", // Jasny kolor obramowania
      green: '#3e9636'
    }
  };
  
  
  const DarkTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      background: '#1c1c1c', // Kolor tła
      backgroundOpacity: 'rgba(0,0,0,0.7)',
      lighterBackground: '#383737',
      surface: '#423e3e', // Lekko jaśniejszy kolor dla powierzchni, aby dodać głębi
      lighterSurface: '#5c5858',
      primary: '#ee80ff', // Głęboki niebieski
      darkerPrimary: '#ca80ff',
      secondary: '#88d1cf', // Ciemny róż
      accent: '#cad44a', // Przykładowy kolor akcentu, możesz dostosować
      text: '#ffffff', // Kolor tekstu dla kontrastu z ciemnym tłem
      onSurface: '#ffffff', // Kolor na powierzchniach, np. tekst na kartach
      disabled: '#f0e9e9', // Kolor elementów nieaktywnych
      placeholder: '#cccccc', // Kolor tekstu placeholdera
      backdrop: '#121212', // Kolor tła modalu, menu, itp.
      notification: '#ff80ab', // Kolor tła powiadomień
      card: "#1c1c1c",
      border: "#000000",
      green: '#3e9636'
    }
  };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={darkThemeEnabled ? DarkTheme : LightTheme}>
            <PaperProvider theme={darkThemeEnabled ? DarkTheme : LightTheme} >
              <Notification />
              <MainStackNavigator />
            </PaperProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
    );
}