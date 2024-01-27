import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'

export default function GoalReachCheckbox({isFinished, toggleFinished}) {
  const toggleSwitch = () => {
    toggleFinished(!isFinished);
  }
  return (
    <View>
      <Text style={styles.labelText}>Goal status</Text>
      <View style={styles.container}>
        <View>
          <Switch
            trackColor={{false: '#db463b', true: '#51c240'}}
            thumbColor='#ffffff'
            onValueChange={toggleSwitch}
            value={isFinished}
          />
        </View>
        <View>
          <Text>
            {
              isFinished ? 'Finished' : 'Not Finished'
            }
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5
  },
  labelText: {
		fontWeight: '600'
	},
})