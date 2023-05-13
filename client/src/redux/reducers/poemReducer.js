import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  poems: [],
  latestPoems: [],
};

export const poemReducer = createReducer(initialState, {
  fetchPoems24Success: (state, action) => {
    state.latestPoems = action.payload.poems;
  },
  fetchPoemsSuccess: (state, action) => {
    state.poems = action.payload.poems;
  },
});
