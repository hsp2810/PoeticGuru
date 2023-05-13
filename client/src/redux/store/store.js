import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/userReducer';
import { poemReducer } from '../reducers/poemReducer';
import { alertReducer } from '../reducers/alertReducer';
import { quoteReducer } from '../reducers/quoteReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    poem: poemReducer,
    alert: alertReducer,
    quote: quoteReducer,
  },
});

export default store;
