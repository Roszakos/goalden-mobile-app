import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useState, useContext } from 'react';
import FormTextInput from '../../components/FormTextInput';
import GoalFinishDate from '../../components/GoalFinishDate';
import { GoalListContext } from '../../contexts/GoalListContext';
import PriorityPicker from '../../components/add-new-goal/PriorityPicker';
import NewGoalFormSubmitButton from '../../components/add-new-goal/NewGoalFormSubmitButton';


export default function AddNewGoalScreen(props) {
	// Form properties
	const [goalTitle, setGoalTitle] = useState('');
	const [goalFinishDate, setGoalFinishDate] = useState(null);
	const [goalPriority, setGoalPriority] = useState(5);
	const [goalDescription, setGoalDescrption] = useState('');

	const { addNewGoal, incrementNumberOfGoals } = useContext(GoalListContext);

	const submitForm = () => {
		incrementNumberOfGoals().then((goalId) => {
			addNewGoal({
				title: goalTitle,
				finishDate: goalFinishDate,
				priority: goalPriority,
				id: goalId
			});
			props.navigation.navigate('GoalList');
		});
	}

  return (
		<View style={styles.contentWrapper}>
			<ScrollView contentContainerStyle={styles.container}>
				<FormTextInput 
					label="Name your goal" 
					placeholder="What do you want to achieve?" 
					value={goalTitle} 
					updateState={setGoalTitle}
				/>
				<View style={ styles.marginView }></View>
				<GoalFinishDate 
					updateGoalFinishDate={(newDate) => {
						setGoalFinishDate(newDate);
					}} 
				/>
				<View style={ styles.marginView }></View>
				<PriorityPicker 
					goalPriority={goalPriority} 
					changeGoalPriority={setGoalPriority}
				/>
				<View style={ styles.marginView }></View>
				<FormTextInput 
					label="Description"
					labelSubtext="(optional)"
					placeholder="Why do you want to reach it, how is it going to help you, etc." 
					value={goalDescription} 
					updateState={setGoalDescrption}
					inputHeight={100}
				/>
			</ScrollView>
			<NewGoalFormSubmitButton navigation={props.navigation} submitForm={submitForm}/>
		</View>
  )
}

const styles = StyleSheet.create({
	contentWrapper: {
		flex: 1
	},
	container: {
		flex: 1,
		alignItems: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: '#f2d5b3'
	},
	marginView: {
		height: 30
	}
});