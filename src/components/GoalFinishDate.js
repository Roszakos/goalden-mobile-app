import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import GoalFinishDateButton from './add-new-goal/GoalFinishDateButton';

export default function GoalFinishDate({updateGoalFinishDate}) {
	const [activeButton, setActiveButton] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>When do you want to achieve it?</Text>
			<View style={styles.touchablesContainer}>
				<GoalFinishDateButton 
					updateGoalFinishDate={updateGoalFinishDate} 
					label="This week" 
					dateOption={1} 
					isActive={activeButton === 1}
					setToActive={setActiveButton}
					bgColor="#f0761f"
				/>
				<GoalFinishDateButton 
					updateGoalFinishDate={updateGoalFinishDate} 
					label="This month" 
					dateOption={2} 
					isActive={activeButton === 2}
					setToActive={setActiveButton}
					bgColor="#8dc223"
				/>
				<GoalFinishDateButton 
					updateGoalFinishDate={updateGoalFinishDate} 
					label="This year" 
					dateOption={3} 
					isActive={activeButton === 3}
					setToActive={setActiveButton}
					bgColor="#ffa412"
				/>
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
			backgroundColor: 'black',
			opacity: 0.4
		}
})