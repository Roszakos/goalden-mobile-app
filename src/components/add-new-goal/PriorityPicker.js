import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React, {useState} from 'react';

export default function PriorityPicker({goalPriority, changeGoalPriority}) {
  const [chosenPriority, setChosenPriority] = useState(goalPriority);

  return (
    <View style={{width: '100%'}}>
      <Text style={styles.labelText}>How important is it for you?</Text>
      <View style={styles.contentContainer}>
        <TouchableHighlight 
          style={[styles.touchableWrapper, chosenPriority == 1 ? '' : styles.touchableInactive]}
          onPress={() => {
            changeGoalPriority(1);
            setChosenPriority(1);
          }}
        >
          <View style={[styles.priorityItem, {backgroundColor: '#d4d13f'}]}>
            <Text style={styles.priorityItemText}>A little</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          style={[styles.touchableWrapper, chosenPriority == 2 ? '' : styles.touchableInactive]}
          onPress={() => {
            changeGoalPriority(2);
            setChosenPriority(2);
          }}
        >
          <View style={[styles.priorityItem, {backgroundColor: '#d4963f'}]}>
            <Text style={styles.priorityItemText}>Medium</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight 
          style={[styles.touchableWrapper, chosenPriority == 3 ? '' : styles.touchableInactive]}
          onPress={() => {
            changeGoalPriority(3);
            setChosenPriority(3);
          }}
        >
          <View style={[styles.priorityItem, {backgroundColor: '#db3e1f'}]}>
            <Text style={styles.priorityItemText}>Very</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  labelText: {
		fontWeight: '600'
	},
  touchableWrapper: {
    width: '33%',
  },
  contentContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  priorityItem: {
    
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  priorityItemText: {
    fontSize: 12,
    textAlign: 'center'
  },
  touchableInactive: {
    backgroundColor: '#000',
    opacity: 0.3
  }
})
