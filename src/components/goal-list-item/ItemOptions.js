import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useContext} from 'react'
import ItemOptionsButton from '../../components/goal-list-item/ItemOptionsButton';
import { GoalListContext } from '../../contexts/GoalListContext';

export default function ItemOptions({goalId, status}) {
  const { markGoalAsFinished, markGoalAsActive } = useContext(GoalListContext);
  const [showOptions, setShowOptions] = useState(false);

  const toggleStatusOptionText = status == 'active' ? 'Mark as finished' : 'Mark as active';

  const toggleOptions = () => {
    setShowOptions(! showOptions);
  }

  return (
    <View style={styles.container}>
      <ItemOptionsButton toggleOptions={toggleOptions}/>
      <View style={[styles.optionsContainer, {display: showOptions ? 'flex' : 'none'}]}>
        <TouchableWithoutFeedback onPress={() => {
          if (status == "active") {
            markGoalAsFinished(goalId);
          } else if (status == "finished") {
            markGoalAsActive(goalId);
          }
        }}>
          <Text style={[styles.optionsItemText]}>
            {
              toggleStatusOptionText
            }
          </Text>
        </TouchableWithoutFeedback>
        <Text style={styles.optionsItemText}>Edit</Text>
        <Text style={[styles.optionsItemText, {color: 'red'}]}>Delete</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  optionsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //height: 100,
    position: 'absolute',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    top: 5,
    right: 25,
    zIndex: 10
  },
  optionsItemText: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 13,
    color: '#fff'
  }
})