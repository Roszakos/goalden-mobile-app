import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import FormTextInput from '../../components/FormTextInput';
import GoalFinishDate from '../../components/GoalFinishDate';
import { GoalListContext } from '../../contexts/GoalListContext';
import PriorityPicker from '../../components/add-new-goal/PriorityPicker';
import NewGoalFormSubmitButton from '../../components/add-new-goal/NewGoalFormSubmitButton';
import GoalReachCheckbox from '../../components/add-new-goal/GoalReachCheckbox';


export default function AddNewGoalScreen(props) {
	let goal = null;
	if (props.route.params.action == 'edit') {
		goal = props.route.params.goal;
	}
	
	// Form properties
	const [goalTitle, setGoalTitle] = useState(goal ? goal.title : '');
	const [goalFinishDate, setGoalFinishDate] = useState(goal ? new Date(goal.finishDate) : null);
	const [goalPriority, setGoalPriority] = useState(goal ? goal.priority : null);
	const [isFinished, setIsFinished] = useState(props.route.params.isFinished ? props.route.params.isFinished : false);

	const { 
		activeGoalList, setActiveGoalList, storeActiveGoals, 
		finishedGoalList, storeFinishedGoals, setFinishedGoalList,
		getNumberOfGoals, storeNumberOfGoals
	} = useContext(GoalListContext);

	useEffect(() => {
		goal = null;
		if (props.route.params.action == 'edit') {
			goal = props.route.params.goal;
		}

		setGoalTitle(goal ? goal.title : '');
		setGoalFinishDate(goal ? new Date(goal.finishDate) : null);
		setGoalPriority(goal ? goal.priority : null);
		setIsFinished(props.route.params.isFinished ? props.route.params.isFinished : false);
	}, [props.route.params])

	const submitForm = () => {
		if (props.route.params.action == 'edit') {
			if (props.route.params.isFinished) {
				if (isFinished) {
					let updatedFinishedGoals = finishedGoalList.slice();
					let editedGoalIndex = updatedFinishedGoals.indexOf(
						updatedFinishedGoals.find((element) => element.id == goal.id)
					)
					updatedFinishedGoals[editedGoalIndex] = {
						title: goalTitle,
						finishDate: goalFinishDate.getTime(),
						created: goal.created,
						priority: goalPriority,
						id: goal.id
					}
					setFinishedGoalList(updatedFinishedGoals);
					storeFinishedGoals(updatedFinishedGoals);
					props.navigation.navigate('FinishedGoals');
				} else {
					let updatedFinishedGoals = finishedGoalList.slice();
					let updatedActiveGoals = activeGoalList.slice();

					let editedGoalIndex = updatedFinishedGoals.indexOf(
						updatedFinishedGoals.find((element) => element.id == goal.id)
					)
					updatedFinishedGoals.splice(editedGoalIndex, 1);

					updatedActiveGoals.unshift({
						title: goalTitle,
						finishDate: goalFinishDate.getTime(),
						created: goal.created,
						priority: goalPriority,
						id: goal.id
					});

					setFinishedGoalList(updatedFinishedGoals);
					storeFinishedGoals(updatedFinishedGoals);
					setActiveGoalList(updatedActiveGoals);
					storeActiveGoals(updatedActiveGoals);

					props.navigation.navigate('ActiveGoals');
				}
			} else {
				if (isFinished) {
					let updatedFinishedGoals = finishedGoalList.slice();
					let updatedActiveGoals = activeGoalList.slice();

					let editedGoalIndex = updatedActiveGoals.indexOf(
						updatedActiveGoals.find((element) => element.id == goal.id)
					)
					updatedActiveGoals.splice(editedGoalIndex, 1);

					updatedFinishedGoals.unshift({
						title: goalTitle,
						finishDate: goalFinishDate.getTime(),
						created: goal.created,
						priority: goalPriority,
						id: goal.id
					});

					setFinishedGoalList(updatedFinishedGoals);
					storeFinishedGoals(updatedFinishedGoals);
					setActiveGoalList(updatedActiveGoals);
					storeActiveGoals(updatedActiveGoals);
					
					props.navigation.navigate('FinishedGoals');
				} else {
					let updatedActiveGoals = activeGoalList.slice();
					let editedGoalIndex = updatedActiveGoals.indexOf(
						updatedActiveGoals.find((element) => element.id == goal.id)
					)
					updatedActiveGoals[editedGoalIndex] = {
						title: goalTitle,
						finishDate: goalFinishDate.getTime(),
						created: goal.created,
						priority: goalPriority,
						id: goal.id
					}
					setActiveGoalList(updatedActiveGoals);
					storeActiveGoals(updatedActiveGoals);

					props.navigation.navigate('ActiveGoals');
				}
			}
		} else {
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
   	  });
			props.navigation.navigate('ActiveGoals');
		}
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
				<View style={ styles.marginView }></View>
				{
					props.route.params.action == 'edit' ? <GoalReachCheckbox isFinished={isFinished} toggleFinished={setIsFinished} /> : null
				}
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