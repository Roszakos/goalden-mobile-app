import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

export default function DurationOptions({chosenDuration, changeDuration}) {

  // const changeOption = (option) => {
  //   switch (option) {
  //     case 1:
  //       changeDuration('0015');
  //       break;
  //     case 2:
  //       changeDuration('0015');
  //       break;
  //     case 3:
  //       changeDuration('0015');
  //       break;
  //     case 4:
  //       changeDuration('0015');
  //       break;
  //     default:
  //       break;
  //   }
  // }
  return (
    <View style={styles.container}>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0015' ? null : styles.touchableInactive]}
        onPress={() => changeDuration('0015') }
      >
        <Text>15 minutes</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0030' ? null : styles.touchableInactive]}
        onPress={() => changeDuration('0030') }
      >
        <Text>30 minutes</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0100' ? null : styles.touchableInactive]}
        onPress={() => changeDuration('0100') }
      >
        <Text>1 hour</Text>
      </TouchableHighlight>
      <TouchableHighlight 
        style={[styles.touchable, chosenDuration == '0200' ? null : styles.touchableInactive]}
        onPress={() => changeDuration('0200') }
      >
        <Text>2 hours</Text>
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
    backgroundColor: '#25a61c',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12
  },
  touchableInactive: {
    backgroundColor: '#000',
    opacity: 0.4
  }
})