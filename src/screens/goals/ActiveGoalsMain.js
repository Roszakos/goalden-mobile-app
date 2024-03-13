import { StyleSheet, View, ImageBackground, Pressable } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper';
import React from 'react'

import ShowGoalListButton from '../../components/goals/ShowGoalListButton'
import AddNewGoalButton from '../../components/AddNewGoalButton'

export default function ActiveGoalsMain({navigation}) {
  const imageSrc = require('../../../assets/goalden-background.webp');
  const theme = useTheme();
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={imageSrc}
    >
      <View style={[styles.container, {backgroundColor: theme.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}]}>
        <View>
          <Text variant="headlineMedium">active</Text>
          <ShowGoalListButton borderColor={theme.colors.green} label="LONG - TERM GOALS" navigation={navigation} category={1}/>
          <ShowGoalListButton borderColor={theme.colors.green} label="SHORT - TERM GOALS"/>
        </View>
        <View style={{marginTop: 20}}>
          <Text variant="headlineMedium">finished</Text>
          <ShowGoalListButton borderColor={theme.colors.darkerPrimary} label="LONG - TERM GOALS"/>
          <ShowGoalListButton borderColor={theme.colors.darkerPrimary} label="SHORT - TERM GOALS"/>
        </View>
      </View>
      <AddNewGoalButton navigation={navigation} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: '5%'
  }
})