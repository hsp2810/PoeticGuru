import {
  Box,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import '../../assets/styles/webrecommendations.css';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const WebRecommendations = () => {
  return (
    <Flex width={'100%'} padding={'5rem'}>
      <Stack flex={50}>
        <Heading fontSize={'3rem'} isTruncated={true} noOfLines={3}>
          Do let us know what
          <br />
          <Box display={'inline'} color={primaryColor}>
            poetry categories
          </Box>
          <br />
          you want us to add.
        </Heading>
      </Stack>
      <form className="recommendation-form">
        <HStack justifyContent={'center'}>
          <input className="inputs" placeholder="Enter your email" />
          <input className="inputs" placeholder="Enter category" />
        </HStack>
        <button className="primary-button form-button">Submit Request</button>
      </form>
    </Flex>
  );
};

export default WebRecommendations;
