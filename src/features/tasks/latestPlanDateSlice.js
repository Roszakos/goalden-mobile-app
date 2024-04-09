import { createSlice } from '@reduxjs/toolkit'

export const latestPlanDateSlice = createSlice({
  name: 'latestPlanDate',
  initialState: {
    value: null
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { set } = latestPlanDateSlice.actions;

export default latestPlanDateSlice.reducer