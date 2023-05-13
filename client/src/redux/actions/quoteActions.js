import axios from 'axios';

const URI = `http://localhost:8080/api/v1/quotes`;

export const actionGetQuotes24 = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}/latest`, {
      withCredentials: true,
    });

    dispatch({
      type: 'fetchQuotes24Success',
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

export const actionGetAllQuotes = async dispatch => {
  try {
    const { data } = await axios.get(`${URI}`, {
      withCredentials: true,
    });

    dispatch({
      type: 'fetchQuotesSuccess',
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

export const actionGetQuote = async quote_id => {
  try {
    const { data } = await axios.get(`${URI}/${quote_id}`, {
      withCredentials: true,
    });

    await axios.post(
      `${URI}/${quote_id}/views`,
      {},
      {
        withCredentials: true,
      }
    );

    return data.quote;
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
