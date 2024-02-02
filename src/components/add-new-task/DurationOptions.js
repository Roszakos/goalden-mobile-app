import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function DurationOptions({chosenDuration, changeDuration, setDurationOptionChanged}) {
  return (
    <View style={styles.container}>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0015' ? null : styles.touchableInactive]}
        onPress={() => {
          if (chosenDuration == '0015') {
            changeDuration(0);
          } else {
            changeDuration('0015');
          }
          setDurationOptionChanged(previousValue => !previousValue);
        }}
      >
        <View style={styles.buttonView}>
          <Text>15 minutes</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0030' ? null : styles.touchableInactive]}
        onPress={() => {
          if (chosenDuration == '0030') {
            changeDuration(0);
          } else {
            changeDuration('0030');
          }
          setDurationOptionChanged(previousValue => !previousValue);
        }}
      >
        <View style={styles.buttonView}>
          <Text>30 minutes</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0100' ? null : styles.touchableInactive]}
        onPress={() => {
          if (chosenDuration == '0100') {
            changeDuration(0);
          } else {
            changeDuration('0100'); 
          }
          setDurationOptionChanged(previousValue => !previousValue);
        }}
      >
        <View style={styles.buttonView}>
          <Text>1 hour</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0200' ? null : styles.touchableInactive]}
        onPress={() => {
          if (chosenDuration == '0200') {
            changeDuration(0);
          } else {
            changeDuration('0200'); 
          }
          setDurationOptionChanged(previousValue => !previousValue);
        }}
      >
        <View style={styles.buttonView}>
          <Text>2 hours</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    gap: 4
  },
  touchable: {
    // paddingHorizontal: 10,
    // paddingVertical: 7,
    borderRadius: 12
  },
  touchableInactive: {
    backgroundColor: '#000',
    opacity: 0.4
  },
  buttonView: {
    backgroundColor: '#25a61c',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12
  }
})