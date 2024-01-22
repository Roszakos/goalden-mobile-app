import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import ItemOptionsButton from '../../components/goal-list-item/ItemOptionsButton';

export default function ItemOptions({show}) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(! showOptions);
  }
  return (
    <View style={styles.container}>
      <ItemOptionsButton toggleOptions={toggleOptions}/>
      <View style={[styles.optionsContainer, {display: showOptions ? 'flex' : 'none'}]}>
        <Text style={[styles.optionsItemText]}>Mark as finished</Text>
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
    backgroundColor: 'black',
    opacity: 0.7,
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