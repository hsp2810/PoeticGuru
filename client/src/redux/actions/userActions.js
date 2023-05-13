import axios from 'axios';

const URI = `http://localhost:8080/api/v1/users`;

export const actionUpdateProfile = async (user, dispatch) => {
  try {
    const { data } = await axios.put(`${URI}/me`, user, {
      withCredentials: true,
    });

    dispatch({
      type: 'updateProfileSuccess',
      payload: data,
    });

    dispatch({
      type: 'setAlert',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data,
    });
  }
};

export const actionFetchMe = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}/me`, {
      withCredentials: true,
    });

    dispatch({
      type: 'getProfileSuccess',
      payload: data,
    });
  } catch (error) {
    // dispatch({
    //   type: 'getProfileFail',
    //   payload: error.response.data,
    // });
    console.log('Error in fetching the profile of the logged in user');
  }
};

export const actionDeleteMe = async dispatch => {
  try {
    const { data } = await axios.delete(`${URI}/me`, {
      withCredentials: true,
    });

    dispatch({
      type: 'deleteMeSuccess',
      payload: data,
    });

    dispatch({
      type: 'setAlert',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'deleteMeFail',
      payload: error.response.data,
    });
  }
};
