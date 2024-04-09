import { createSlice } from '@reduxjs/toolkit'

export const finishedGoalsSlice = createSlice({
  name: 'finishedGoals',
  initialState: {
    list: []
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    destroy: (state, action) => {
      const toDelete = state.list.find(element => element.id == action.payload.id);
      state.list.splice(state.list.indexOf(toDelete), 1);
    },
    update: (state, action) => {
      state.list[state.list.indexOf(state.list.find((element) => element.id == action.payload.id))] = action.payload;
    }
  }
})

export const { add, destroy, update } = finishedGoalsSlice.actions;

export default finishedGoalsSlice.reducer