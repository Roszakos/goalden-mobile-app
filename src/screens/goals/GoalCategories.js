import { StyleSheet, View, ImageBackground, Pressable } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper';
import React from 'react'

import ShowGoalListButton from '../../components/goals/ShowGoalListButton'
import AddNewGoalButton from '../../components/AddNewGoalButton'

export default function GoalCategories({navigation}) {
  const imageSrc = require('../../../assets/goalden-background.webp');
  const theme = useTheme();
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={imageSrc}
    >
      <View style={[styles.container, {backgroundColor: theme.dark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'}]}>
        <View style={styles.categoriesView}>
          <View>
            <ShowGoalListButton 
              borderColor={theme.colors.green} 
              label="ACTIVE GOALS" 
              navigation={navigation} 
              category={1}
            />
          </View>
          <View style={{marginTop: 20}}>
            <ShowGoalListButton 
              borderColor={theme.colors.darkerPrimary} 
              label="REACHED GOALS" 
              navigation={navigation} 
              category={2}
            />
          </View>
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
  },
  categoriesView: {
    //flexDirection: 'row'
  }
})