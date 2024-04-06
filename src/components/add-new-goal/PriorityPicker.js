import { StyleSheet, View, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';

export default function PriorityPicker({goalPriority, setGoalPriority}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={styles.labelText}>Priority</Text>
      <View style={styles.contentContainer}>
        <Pressable 
          style={[styles.touchableWrapper, goalPriority == 1 ? '' : styles.touchableInactive]}
          onPress={() => {
            setGoalPriority(1);
          }}
        >
          <View style={[styles.priorityItem, {backgroundColor: 'orange'}]}>
            <Text style={styles.priorityItemText}>Low</Text>
          </View>
        </Pressable>
        <Pressable 
          style={[styles.touchableWrapper, goalPriority == 3 ? '' : styles.touchableInactive]}
          onPress={() => {
            setGoalPriority(3);
          }}
        >
          <View style={[styles.priorityItem, {backgroundColor: 'red'}]}>
            <Text style={styles.priorityItemText}>High</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#6f7070"
  },
  labelText: {
    textAlign: 'center',
    fontFamily: 'Josefin',
    letterSpacing: 0.8,
		fontWeight: '600',
    fontSize: 16
	},
  touchableWrapper: {
    width: '48%',
  },
  contentContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  priorityItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  priorityItemText: {
    fontSize: 14,
    textAlign: 'center'
  },
  touchableInactive: {
    backgroundColor: '#000',
    opacity: 0.3
  }
})
