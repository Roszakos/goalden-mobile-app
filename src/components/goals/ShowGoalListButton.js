import { StyleSheet, View, Pressable } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper';
import React from 'react'

export default function ShowGoalListButton({label, category, borderColor, navigation}) {
  const theme = useTheme();
  const header = category === 1 ? 'Active Goals' :  'Finished Goals';
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer, 
        {
          backgroundColor: pressed ? theme.colors.lighterBackground : theme.colors.background, 
          borderColor: borderColor
        }
      ]}
      onPress={()=> navigation.navigate('GoalList', {header: header, category: category})}
    >
      <Text 
        style={[styles.buttonText]}
        variant="labelLarge"
      >
        {label}
      </Text>
      <Icon
        source="arrow-right-thin"
        color={borderColor}
        size={40}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 2,
    padding: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  }
})