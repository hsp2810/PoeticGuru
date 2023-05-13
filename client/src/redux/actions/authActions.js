import axios from 'axios';

const URI = `http://localhost:8080/api/v1/auth`;

export const actionLogin = async (user, dispatch, navigate) => {
  try {
    const { data } = await axios.post(`${URI}/login`, user, {
      withCredentials: true,
    });

    dispatch({
      type: 'loginSuccess',
      payload: data,
    });

    dispatch({
      type: 'setAlert',
      payload: data,
    });

    navigate('/new');
  } catch (error) {
    dispatch({
      type: 'setAlert',
      payload: error.response.data,
    });
  }
};

export const actionLogout = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: 'logoutSuccess',
      payload: data,
    });

    dispatch({
      type: 'setAlert',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'loginFail',
      payload: error.response.data,
    });
  }
};

export const actionRegister = async (user, dispatch) => {
  try {
    const { data } = await axios.post(`${URI}/register`, user, {
      withCredentials: true,
    });

    dispatch({
      type: 'registerSuccess',
      payload: data,
    });

    dispatch({
      type: 'setAlert',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'registerFail',
      payload: error.response.data,
    });
  }
};

export const actionAuthenticate = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}/authenticate`, {
      withCredentials: true,
    });

    dispatch({
      type: 'authSuccess',
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: 'authFail',
    //   payload: error.response.data,
    // });
    console.log('Error when authenticating the user in the redux');
  }
};
