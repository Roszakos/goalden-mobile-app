import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function AddNewGoalButton() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.buttonTouchable} onPress={() => {return}}>
        <View style={styles.button} >
          <Text style={styles.buttonText}>ADD NEW GOAL</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 12,
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonTouchable: {
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 23,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})