import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';

export default function AddNewGoalButton({showGoalDetails}) {
  const { colors } = useTheme();
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight 
        style={styles.buttonTouchable} 
        onPress={() => { 
          showGoalDetails(null);
        }}>
        <View style={[styles.button, {backgroundColor: colors.tertiary}]} >
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
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: 16,
  },
})