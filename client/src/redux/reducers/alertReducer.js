import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  alertType: null,
  alertMessage: null,
};

export const alertReducer = createReducer(initialState, {
  setAlert: (state, action) => {
    state.alertType = action.payload.alert.type;
    state.alertMessage = action.payload.alert.message;
  },

  clearAlert: (state, action) => {
    state.alertType = null;
    state.alertMessage = null;
  },
});
