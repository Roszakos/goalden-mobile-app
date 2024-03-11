import { StyleSheet, View, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper';
import React, {useEffect } from 'react'

export default function FinishedGoalsMain() {
  const imageSrc = require('../../../assets/goalden-background.webp');
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={imageSrc}
    >
      <View style={styles.container}>
        <Text>FinishedGoalsMain</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)'
  }
})