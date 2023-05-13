import { Avatar, HStack, Heading } from '@chakra-ui/react';
import React from 'react';

const AuthorProfile = ({ color, name }) => {
  return (
    <HStack
      border={`2px solid ${color}`}
      bg={color}
      padding={'1rem'}
      borderRadius={'1rem'}
      alignItems={'flex-start'}
      width={'fit-content'}
      float={'right'}
      margin={'1rem'}
      color={'#fff'}
    >
      <Avatar name="Parth Patel" src="https://bit.ly/ryan-florence" />
      <Heading size={'md'}>Author: {name}</Heading>
    </HStack>
  );
};

export default AuthorProfile;
