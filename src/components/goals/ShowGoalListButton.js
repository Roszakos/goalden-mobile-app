import { StyleSheet, View, Pressable } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper';
import React from 'react'

export default function ShowGoalListButton({label, link, borderColor, navigation}) {
  const theme = useTheme();
  return (
    <Pressable
      style={({pressed}) => [
        styles.buttonContainer, 
        {
          backgroundColor: pressed ? theme.colors.lighterBackground : theme.colors.background, 
          borderColor: borderColor
        }
      ]}
      onPress={()=> console.log('xd')}
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
    width: '100%',
    borderWidth: 2,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  }
})