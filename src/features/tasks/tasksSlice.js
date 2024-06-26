import { createSlice } from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: []
  },
  reducers: {
    set: (state, action) => {
      state.list = action.payload;
    },
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

export const { set, add, destroy, update } = tasksSlice.actions;

export default tasksSlice.reducer