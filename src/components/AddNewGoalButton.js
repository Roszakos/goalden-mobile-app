import { StyleSheet, Text, View, TouchableHighlight, DeviceEventEmitter } from 'react-native';
import React from 'react';

export default function AddNewGoalButton({navigation}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight 
        style={styles.buttonTouchable} 
        onPress={() => {
          navigation.navigate('AddNewGoal', {action: 'create', headerTitle: 'Set new goal', isFinished: false});
        }}>
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
    letterSpacing: 0.5
  },
})