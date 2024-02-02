import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function AddNewTaskButton({navigation}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight 
        style={styles.buttonTouchable}
        onPress={() => {
          navigation.navigate('AddNewTask', {headerTitle: 'Add new task'});
        }}
      >
        <Text style={styles.buttonText}>ADD TASK</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    padding: 13,
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  buttonTouchable: {
    backgroundColor: '#2e78f0',
    borderRadius: 100, 
  }
})