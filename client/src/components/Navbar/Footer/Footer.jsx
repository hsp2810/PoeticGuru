import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const Footer = () => {
  return (
    <Box
      bg={primaryBgColor}
      py="4"
      px="6"
      w={'100%'}
      position={'absolute'}
      bottom={0}
      marginTop={'2rem'}
    >
      <Container maxW="container.lg">
        <Flex justify="space-between" alignItems="center">
          <Text>&copy; 2023 PoeticGuru. All rights reserved.</Text>
          <Flex>
            <Link mx="4" href="#">
              Privacy Policy
            </Link>
            <Link mx="4" href="#">
              Terms of Service
            </Link>
            <Link mx="4" href="#">
              Contact Us
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
// <Flex bgColor={primaryBgColor} padding={'1rem'}>
//   <Heading fontSize={'1rem'} textAlign={'center'}>
//     fetfgefg
//   </Heading>
// </Flex>
