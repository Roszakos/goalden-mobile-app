import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

export default function ActiveGoalsMain() {
  const imageSrc = require('../../../assets/goalden-background.webp');
  return (
    <ImageBackground
      style={styles.container}
      source={imageSrc}
    >
      <Text>FinishedGoalsMain</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    objectFit: 'fill',
    opacity: 0.5
  }
})