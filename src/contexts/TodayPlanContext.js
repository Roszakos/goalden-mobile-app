import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TodayPlanContext = createContext([]);

export default function TodayPlanContextProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const storeTodayTasks = async (tasks) => {
        try {
            const tasksJson = JSON.stringify(tasks)
            await AsyncStorage.setItem('todayTasks', tasksJson);
        } catch (e) {
            console.log(e);
        }
    }
    const getTodayTasks = async () => {
        try {
            const tasksJson = await AsyncStorage.getItem('todayTasks')
            return tasksJson != null ? JSON.parse(tasksJson) : [];
        } catch (e) {
            console.log(e);
        }
    }

    const storeLatestPlanDate = async (date) => {
        try {
            await AsyncStorage.setItem('latestPlanDate', date);
        } catch (e) {
            console.log(e);
        }
    }
    const getLatestPlanDate = async () => {
        try {
            const date = await AsyncStorage.getItem('latestPlanDate')
            return date != null ? date : null;
        } catch (e) {
            console.log(e);
        }
    }

    return (
      <TodayPlanContext.Provider value={{ 
            tasks, setTasks, 
            storeTodayTasks, getTodayTasks,
            storeLatestPlanDate, getLatestPlanDate
        }}
    >
        { children }
      </TodayPlanContext.Provider>
    )
}