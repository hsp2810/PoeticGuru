import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { actionUpdateProfile } from '../../redux/actions/userActions';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');

const EditUserPrompt = ({ isOpen, onOpen, onClose, homeUser }) => {
  const [name, setName] = useState(homeUser.name);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    actionUpdateProfile({ name }, dispatch);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={'bold'}>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl m={'1rem 0rem'}>
              <FormLabel htmlFor="name">Enter new name</FormLabel>
              <Input
                variant="filled"
                placeholder="Enter your name"
                m={'0.5rem 0rem'}
                name={'name'}
                value={name}
                onChange={e => setName(e.target.value)}
                borderColor={primaryColor}
                focusBorderColor={primaryColor}
              />
            </FormControl>
            <Alert status="warning">
              <AlertIcon />
              Note: You cannot edit email.
            </Alert>
          </ModalBody>

          <ModalFooter>
            <Button variant={'ghost'} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="green"
              p={'1.65rem 1rem'}
              borderRadius={'2rem'}
              color="#fff"
              fontWeight={'600'}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUserPrompt;
