import { StyleSheet, Text } from 'react-native'
import React from 'react'

export default function DateDisplay({date}) {
  let dateToDisplay;
  if (date) {
    const dateObject = new Date(date);
    let day = dateObject.getDate() < 10 ? '0' + dateObject.getDate() : dateObject.getDate();
    let month = (dateObject.getMonth() + 1) < 10 ? '0' + (parseInt(dateObject.getMonth()) + 1) : (parseInt(dateObject.getMonth()) + 1);
    dateToDisplay = day + '-' + month + '-' + dateObject.getFullYear();
  } else {
    dateToDisplay = '-';
  }

  return (
    <Text>{dateToDisplay}</Text>
  )
}

const styles = StyleSheet.create({})