import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';

export default function GoalFinishDateButton({updateGoalFinishDate, dateOption, label, isActive, setToActive, bgColor}) {
	const getFinishDate = (dateOption) => {
		const today = new Date();
		switch (dateOption) {
			case 1:
				const daysToAdd = 8 - today.getDay();
				const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd, 1);
				return lastDayOfWeek;
			case 2:
				const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1, 1);
				return lastDayOfMonth;
			case 3:
				const lastDayOfYear = new Date(today.getFullYear() + 1, 0, 1, 1);
				return lastDayOfYear;
			default:
				return;
		}
	}
  return (
    <TouchableHighlight 
			style={[styles.touchableWrapper, isActive ? null : styles.touchableInactive]}
			onPress={() => {
				updateGoalFinishDate(getFinishDate(dateOption));
				setToActive(dateOption)
			}}
		>
			<View style={[styles.button, {backgroundColor: bgColor}]}>
				<Text>{label}</Text>
			</View>
		</TouchableHighlight>
  )
}

const styles = StyleSheet.create({
	touchablesContainer: {
		width: '100%',
		flexDirection: 'row',
		gap: 6
	},
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