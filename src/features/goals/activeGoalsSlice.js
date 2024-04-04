import { createSlice } from '@reduxjs/toolkit'

export const activeGoalsSlice = createSlice({
  name: 'activeGoals',
  initialState: {
    list: []
  },
  reducers: {
    add: (state, action) => {
      state.list.push(action.payload);
    },
    destroy: (state, action) => {
      state.list.splice(state.list.indexOf(action.payload));
    },
    update: (state, action) => {
      state.list[state.list.indexOf(state.list.find((element) => element.id == action.payload.id))] = action.payload;
    }
  }
})

export const { add, destroy, update } = activeGoalsSlice.actions;

export default activeGoalsSlice.reducer