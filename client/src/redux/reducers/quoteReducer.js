import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  quotes: [],
  latestQuotes: [],
};

export const quoteReducer = createReducer(initialState, {
  fetchQuotes24Success: (state, action) => {
    state.latestQuotes = action.payload.quotes;
  },
  fetchQuotesSuccess: (state, action) => {
    state.quotes = action.payload.quotes;
  },
});
