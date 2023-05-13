import axios from 'axios';

const URI = `http://localhost:8080/api/v1/poems`;

export const actionGetPoems24 = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}/latest`, {
      withCredentials: true,
    });

    dispatch({
      type: 'fetchPoems24Success',
      payload: data,
    });
    // Don't have to show the user that the poems and everything have been fetched nicely
    // dispatch({
    //   type: 'setAlert',
    //   payload: data,
    // });
  } catch (error) {
    console.log('xyz');
  }
};

export const actionGetAllPoems = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}`, {
      withCredentials: true,
    });

    dispatch({
      type: 'fetchPoemsSuccess',
      payload: data,
    });
    // Don't have to show the user that the poems and everything have been fetched nicely
    // dispatch({
    //   type: 'setAlert',
    //   payload: data,
    // });
  } catch (error) {
    console.log('xyz');
  }
};

export const actionGetPoem = async poem_id => {
  try {
    const { data } = await axios.get(`${URI}/${poem_id}`, {
      withCredentials: true,
    });

    // When we are getting the poem that means user is about to view the poem so we will increase the views

    await axios.post(
      `${URI}/${poem_id}/views`,
      {},
      {
        withCredentials: true,
      }
    );

    return data.poem;
  } catch (error) {
    console.log('xyz');
  }
};

export const actionLikePoem = async poem_id => {
  try {
    await axios.post(
      `${URI}/${poem_id}/likes`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log('xyz');
  }
};
