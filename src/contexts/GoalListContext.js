import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GoalListContext = createContext([]);

export default function GoalListContextProvider({children}) {
    const [activeGoalList, setActiveGoalList] = useState([]);
    const [finishedGoalList, setFinishedGoalList] = useState([]);

    /** AsyncStorage functions */

    // clearAll = async () => {
    // try {
    //     await AsyncStorage.clear()
    // } catch(e) {
    //     // clear error
    // }

    // console.log('Done.')
    // }
    // clearAll();

    // ID of last added goal
    const storeNumberOfGoals = async (number) => {
        try {
            await AsyncStorage.setItem('numberOfGoals', number);
        } catch (e) {
            console.log(e);
        }
    }
    const getNumberOfGoals = async () => {
        try {
            const numberOfGoals = await AsyncStorage.getItem('numberOfGoals');
            return numberOfGoals != null ? numberOfGoals : 0;
        } catch (e) {
            console.log(e);
        }
    }

    // Active Goals
    const storeActiveGoals = async (goals) => {
        try {
            const goalsJson = JSON.stringify(goals)
            await AsyncStorage.setItem('activeGoals', goalsJson);
        } catch (e) {
            console.log(e);
        }
    }
    const getActiveGoals = async () => {
        try {
            const goalsJson = await AsyncStorage.getItem('activeGoals')
            return goalsJson != null ? JSON.parse(goalsJson) : [];
        } catch (e) {
            console.log(e);
        }
    }

    // Finished Goals
    const storeFinishedGoals = async (goals) => {
        try {
            const goalsJson = JSON.stringify(goals)
            await AsyncStorage.setItem('finishedGoals', goalsJson);
        } catch (e) {
            console.log(e);
        }
    }
    const getFinishedGoals = async () => {
        try {
            const goalsJson = await AsyncStorage.getItem('finishedGoals')
            return goalsJson != null ? JSON.parse(goalsJson) : [];
        } catch (e) {
            console.log(e);
        }
    }
    /** AsyncStorage functions */
    
    // Context functions
    const incrementNumberOfGoals = async () => {
        return getNumberOfGoals().then((response) => {
            storeNumberOfGoals(String(parseInt(response) + 1));
            console.log('num of goals: ' + response);
            return parseInt(response);
        });
    }

    const addNewGoal = (goal) => {
        const newList = [goal, ...activeGoalList];
        setActiveGoalList(newList);
        storeActiveGoals(newList);
    }

    const markGoalAsFinished = (goalId) => {
        getActiveGoals().then((activeGoals) => {
            activeGoals = response
        });
    }

    return (
        <GoalListContext.Provider 
            value={{ 
                activeGoalList, setActiveGoalList, getActiveGoals, 
                finishedGoalList, setFinishedGoalList, getFinishedGoals, 
                addNewGoal, incrementNumberOfGoals 
            }}
        >
            {children}
        </GoalListContext.Provider>
    )
}
