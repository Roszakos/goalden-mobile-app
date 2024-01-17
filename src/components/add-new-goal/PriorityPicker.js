import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';

export default function PriorityPicker({goalPriority, changeGoalPriority}) {
  const [sliderMinTintColor, setSliderMinTintColor] = useState('#db991f');

  return (
    <View style={{width: '100%'}}>
      <View style={ styles.labelContainer }>
        <Text style={styles.labelText}>How important is it for you?</Text>
        <Text style={styles.labelSecondaryText}>Set the priority</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Text>1</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          value={5}
          step={1}
          minimumTrackTintColor={sliderMinTintColor}
          maximumTrackTintColor="#fff"
          onValueChange={(value) => {
            changeGoalPriority(value)
            if (value > 8) {
              setSliderMinTintColor('red');
            } else if (value > 6) {
              setSliderMinTintColor('#de5f1b')
            } else if ( value > 4) {
              setSliderMinTintColor('#db991f')
            } else if ( value > 2) {
              setSliderMinTintColor('#d9b527')
            } else {
              setSliderMinTintColor('#d9d927')
            }
          }}
          thumbTintColor="black"
        />
        <Text>10</Text>
      </View>
      <View style={styles.chosenPriorityContaniner}>
        <Text style={styles.chosenPriorityText}>Priority: {goalPriority}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  slider: {
    width: '85%',
    opacity: 1,
    height: 30,
  },
  labelContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    gap: 4
  },
  labelText: {
		fontWeight: '600'
	},
  labelSecondaryText: {
    fontWeight: '400',
    color: 'gray'
  },
  sliderContainer: {
    flexDirection: 'row',
    gap: 3
  },
  chosenPriorityContaniner: {
    alignItems: 'center',
    width: '90%',
    paddingBottom: 10
  },
  chosenPriorityText: {
    fontWeight: '700',
    letterSpacing: 0.3
  }
})