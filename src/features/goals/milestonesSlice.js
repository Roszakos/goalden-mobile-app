import { createSlice, createSelector } from '@reduxjs/toolkit'

export const milestonesSlice = createSlice({
  name: 'milestones',
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

export const { add, destroy, update } = milestonesSlice.actions;

export default milestonesSlice.reducer;

const selectMilestones = state => state.milestones.list;
const goalId = (state, goalId) => goalId;

export const getMilestonesByGoalId = createSelector(
  [selectMilestones, goalId],
  (milestones, goalId) => milestones.filter(milestone => milestone.goalId == goalId)
)