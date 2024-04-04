import { createSlice } from '@reduxjs/toolkit'

export const lastGoalIdSlice = createSlice({
  name: 'lastGoalId',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state += 1;
    }
  }
})

export const { increment } = lastGoalIdSlice.actions;

export default lastGoalIdSlice.reducer;