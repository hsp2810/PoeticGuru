import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import EditUserPrompt from '../../components/Profile/EditUserPrompt';
import { useDispatch, useSelector } from 'react-redux';
import { actionFetchMe } from '../../redux/actions/userActions';
import DeleteUserPrompt from '../../components/Profile/DeleteUserPrompt';

const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const Profile = () => {
  const dispatch = useDispatch();
  const { homeUser } = useSelector(state => state.user);

  useEffect(() => {
    actionFetchMe(dispatch);
  }, []);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  return (
    <>
      <VStack
        bg={primaryBgColor}
        w={'40%'}
        margin={'3rem auto'}
        p={'5rem'}
        borderRadius={'1rem'}
      >
        {!homeUser ? (
          <Spinner />
        ) : (
          <>
            <Stack>
              <Heading children={'Your Profile'} />
            </Stack>
            <HStack mt={'3rem !important'}>
              <VStack alignItems={'flex-start'}>
                <Text fontSize={'md'}>Name: {homeUser.name}</Text>
                <Text fontSize={'md'}>Email: {homeUser.email}</Text>
              </VStack>
            </HStack>
            <ButtonGroup mt={'3rem !important'}>
              <Button
                colorScheme="green"
                p={'1.65rem 1rem'}
                borderRadius={'2rem'}
                color="#fff"
                fontWeight={'600'}
                onClick={onEditOpen}
              >
                Edit profile
              </Button>
              <Button
                colorScheme="red"
                p={'1.65rem 1rem'}
                borderRadius={'2rem'}
                color="#fff"
                fontWeight={'600'}
                onClick={onDeleteOpen}
              >
                Delete account
              </Button>
            </ButtonGroup>
            <EditUserPrompt
              isOpen={isEditOpen}
              onOpen={onEditOpen}
              onClose={onEditClose}
              homeUser={homeUser}
            />
            <DeleteUserPrompt
              isOpen={isDeleteOpen}
              onOpen={onDeleteOpen}
              onClose={onDeleteClose}
              cancelRef={cancelRef}
              homeUser={homeUser}
            />
          </>
        )}
      </VStack>
      )
    </>
  );
};

export default Profile;
