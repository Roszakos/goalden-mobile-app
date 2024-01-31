import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import GoalFinishDateButton from './add-new-goal/GoalFinishDateButton';
import DateDisplay from './DateDisplay';

const calculateDateOption = (date) => {
	if (date) {
		const today = new Date();
		const daysToAdd = 8 - today.getDay();

		const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd, 1);
		const thisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1, 1);
		const thisYear = new Date(today.getFullYear() + 1, 0, 1, 1);
		
		if (date.getTime() == thisWeek.getTime()) return 1;
		if (date.getTime() == thisMonth.getTime()) return 2;
		if (date.getTime() == thisYear.getTime()) return 3;
	}
	return null;
}

export default function GoalFinishDate({updateGoalFinishDate, finishDate}) {
	finishDate = finishDate ? new Date(finishDate) : null;
	const [activeButton, setActiveButton] = useState(calculateDateOption(finishDate));

	useEffect(() => {
		setActiveButton(calculateDateOption(finishDate));
	}, [finishDate])

	const changeDateOption = (option) => {
		setActiveButton(option);
		updateGoalFinishDate(getFinishDate(option));
	}

	const getFinishDate = (dateOption) => {
		let finishDate;
		const today = new Date();
		switch (dateOption) {
			case 1:
				const daysToAdd = 8 - today.getDay();
				finishDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd, 1);
				break;
			case 2:
				finishDate = new Date(today.getFullYear(), today.getMonth() + 1, 1, 1);
				break;
			case 3:
				finishDate = new Date(today.getFullYear() + 1, 0, 1, 1);
				break;
			default:
				break;
		}
		return finishDate;
	}

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>When do you want to achieve it?</Text>
			<View style={styles.touchablesContainer}>
				<GoalFinishDateButton 
					label="This week" 
					dateOption={1} 
					isActive={activeButton === 1}
					bgColor="#f0761f"
					changeDateOption={changeDateOption}
				/>
				<GoalFinishDateButton 
					label="This month" 
					dateOption={2} 
					isActive={activeButton === 2}
					bgColor="#8dc223"
					changeDateOption={changeDateOption}
				/>
				<GoalFinishDateButton 
					label="This year" 
					dateOption={3} 
					isActive={activeButton === 3}
					bgColor="#ffa412"
					changeDateOption={changeDateOption}
				/>
			</View>
			<View style={styles.chosenDateView}>
				<Text>
					{ 'Deadline: ' }
					<DateDisplay date={finishDate} />
				</Text>
			</View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
			width: '100%',
			flexDirection: 'column',
		},
		labelText: {
			paddingVertical: 5,
			fontWeight: '600'
		},
		touchablesContainer: {
			width: '100%',
			flexDirection: 'row',
			gap: 6,
			flexWrap: 'wrap',
		},
		button: {
			borderRadius: 16,
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 14,
			paddingVertical: 5,
		},
		chosenDateView: {
			alignItems: 'flex-start',
			paddingHorizontal: 2,
			paddingTop: 10
		}
})