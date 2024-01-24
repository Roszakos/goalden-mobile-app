import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';

export default function GoalFinishDateButton({dateOption, label, isActive, bgColor, changeDateOption}) {
	
  return (
    <TouchableHighlight 
			style={[styles.touchableWrapper, isActive ? null : styles.touchableInactive]}
			onPress={() => {
				changeDateOption(dateOption);
			}}
		>
			<View style={[styles.button, {backgroundColor: bgColor}]}>
				<Text style={{textTransform: 'uppercase', fontSize: 12}}>{label}</Text>
			</View>
		</TouchableHighlight>
  )
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 14,
		paddingVertical: 5,
	},
	touchableWrapper: {
		borderRadius: 16,
	},
	touchableInactive: {
		backgroundColor: 'black',
		opacity: 0.4
	}
})