import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLogin: null,
  homeUser: null,
};

export const userReducer = createReducer(initialState, {
  loginSuccess: (state, action) => {
    state.isLogin = true;
    state.homeUser = action.payload.user;
  },

  // loginFail: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alert.message;
  // },

  // registerSuccess: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alert.message;
  // },

  // registerFail: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alert.message;
  // },

  authSuccess: (state, action) => {
    state.isLogin = true;
    state.homeUser = action.payload.user;
  },

  logoutSuccess: (state, action) => {
    state.isLogin = false;
    state.homeUser = null;
  },

  updateProfileSuccess: (state, action) => {
    state.homeUser = action.payload.editedMe;
  },

  // updateProfileFail: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alertMessage;
  // },

  getProfileSuccess: (state, action) => {
    state.homeUser = action.payload.me;
  },

  // deleteMeSuccess: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alert.message;
  // },

  // deleteMeFail: (state, action) => {
  //   state.alertType = action.payload.alert.type;
  //   state.alertMessage = action.payload.alert.message;
  // },

  clearAlert: (state, action) => {
    state.alertType = null;
    state.alertMessage = null;
  },
});
