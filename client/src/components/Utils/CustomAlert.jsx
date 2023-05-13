import { Alert, AlertIcon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const CustomAlert = ({ type, message }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setShowAlert(false);
        dispatch({
          type: 'clearAlert',
        });
      }, 2000);
    }
    setShowAlert(true);
  }, []);

  return (
    <>
      {showAlert && (
        <Alert status={type} transition={'ease-in-out 0.2s'}>
          <AlertIcon />
          {message}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;
