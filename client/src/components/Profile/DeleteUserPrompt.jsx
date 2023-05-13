import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { actionDeleteMe } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const DeleteUserPrompt = ({ isOpen, onOpen, onClose, cancelRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    actionDeleteMe(dispatch);
    navigate('/');
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Delete Account?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete your account?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant={'ghost'} ref={cancelRef} onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            p={'1.65rem 1rem'}
            borderRadius={'2rem'}
            color="#fff"
            fontWeight={'600'}
            onClick={handleDelete}
          >
            Delete it!
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserPrompt;
