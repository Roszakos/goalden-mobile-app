import { StyleSheet , View, ImageBackground } from 'react-native'
import { Text, useTheme } from 'react-native-paper';
import React, {useEffect } from 'react'

export default function FinishedGoalsMain() {
  const imageSrc = require('../../../assets/goalden-background.webp');
  const theme = useTheme();
  return (
    <ImageBackground
      style={styles.imageBackground}
      source={imageSrc}
    >
      <View style={[styles.container, {backgroundColor: theme.dark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}]}>
        <View>
          
        </View>
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
  }
})