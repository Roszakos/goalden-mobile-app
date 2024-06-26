import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function AddNewTaskButton({showTaskDetails}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight 
        style={styles.buttonTouchable}
        onPress={() => {
          showTaskDetails(null);
        }}
      >
        <View style={styles.button} >
          <Text style={styles.buttonText}>ADD NEW TASK</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  buttonTouchable: {
    width: '100%',
  },
  button: {
    backgroundColor: '#1371bd',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 16
  },
})