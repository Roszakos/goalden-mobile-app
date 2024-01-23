import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useState, useContext } from 'react';
import FormTextInput from '../../components/FormTextInput';
import GoalFinishDate from '../../components/GoalFinishDate';
import { GoalListContext } from '../../contexts/GoalListContext';
import PriorityPicker from '../../components/add-new-goal/PriorityPicker';
import NewGoalFormSubmitButton from '../../components/add-new-goal/NewGoalFormSubmitButton';


export default function AddNewGoalScreen(props) {
	let goal = null;
	if (props.route.params.action == 'edit') {
		goal = props.route.params.goal;
	}
	
	// Form properties
	const [goalTitle, setGoalTitle] = useState(goal ? goal.title : '');
	const [goalFinishDate, setGoalFinishDate] = useState(goal ? goal.finishDate : null);
	const [goalPriority, setGoalPriority] = useState(goal ? goal.priority : null);

	const { activeGoalList, setActiveGoalList, storeActiveGoals, getNumberOfGoals, storeNumberOfGoals } = useContext(GoalListContext);

	const submitForm = () => {
		getNumberOfGoals().then((goalId) => {
        storeNumberOfGoals(String(parseInt(goalId) + 1));
        const newList = [
					{
						title: goalTitle,
						finishDate: goalFinishDate.getTime(),
						created: Date.now(),
						priority: goalPriority,
						id: goalId
					},
					 ...activeGoalList
				];
        setActiveGoalList(newList);
        storeActiveGoals(newList);
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
					inputHeight={110}
					updateState={setGoalTitle}
				/>
				<View style={ styles.marginView }></View>
				<GoalFinishDate 
					updateGoalFinishDate={(newDate) => {
						setGoalFinishDate(newDate);
					}} 
					finishDate={goalFinishDate}
				/>
				<View style={ styles.marginView }></View>
				<PriorityPicker 
					goalPriority={goalPriority} 
					changeGoalPriority={setGoalPriority}
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