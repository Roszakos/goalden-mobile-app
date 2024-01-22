import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ItemOptionsButton({toggleOptions}) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toggleOptions();
      }}
    >
      <MaterialCommunityIcons 
        style={{padding: 5}}
        name="dots-vertical" 
        size={26} 
        color="black" 
      />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({})