import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

// Reducers
import activeGoalsReducer from '../features/goals/activeGoalsSlice';
import finishedGoalsReducer from '../features/goals/finishedGoalsSlice';
import lastGoalIdReducer from '../features/goals/lastGoalIdSlice';
import milestonesReducer from '../features/goals/milestonesSlice';
import tasksReducer from '../features/tasks/tasksSlice';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
	activeGoals: activeGoalsReducer,
	finishedGoals: finishedGoalsReducer,
	lastGoalId: lastGoalIdReducer,
	milestones: milestonesReducer,
	tasks: tasksReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
