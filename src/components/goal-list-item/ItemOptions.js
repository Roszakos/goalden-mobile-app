import { StyleSheet, View} from 'react-native'
import React, { useState } from 'react'
import ItemOptionsButton from '../../components/goal-list-item/ItemOptionsButton';
import ToggleGoalStatus from '../goal-options/ToggleGoalStatus';
import EditGoal from '../goal-options/EditGoal';
import DeleteGoal from '../goal-options/DeleteGoal';

export default function ItemOptions({goalId, status}) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(! showOptions);
  }

  return (
    <View style={styles.container}>
      <ItemOptionsButton toggleOptions={toggleOptions}/>
      <View style={[styles.optionsContainer, {display: showOptions ? 'flex' : 'none'}]}>
        <ToggleGoalStatus goalId={goalId} status={status} optionsItemTextStyle={styles.optionsItemText} />
        <EditGoal goalId={goalId} status={status} optionsItemTextStyle={styles.optionsItemText} />
        <DeleteGoal goalId={goalId} status={status} optionsItemTextStyle={styles.optionsItemText} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  optionsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    alignItems: 'flex-end',
    alignContent: 'stretch',
    top: 5,
    right: 25,
    zIndex: 10
  },
  optionsItemText: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontSize: 13,
    color: '#fff',
  }
})