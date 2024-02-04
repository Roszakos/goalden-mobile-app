import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoalListItem from './GoalListItem'

export default function GoalListSection({navigation, goalList, label}) {
  return (
    <View>
      <View>
        <Text>{ label }</Text>
      </View>
      {
        goalList.map((goal) => {
          return <GoalListItem key={goal.id} goal={goal} navigation={navigation} /> 
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({})