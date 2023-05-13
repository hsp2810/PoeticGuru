import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import WebFlower from '../../assets/images/web-flower.png';
import LoginPopup from '../Login/LoginPopup';

const WebMain = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState('');
  const words = ['poetry', 'quotes', 'stories'];
  const delay = 100; // time in ms between each letter change
  const wordDelay = 1000; // time in ms to wait before changing to a new word

  useEffect(() => {
    let timeoutId = null;
    let currentIndex = 0;
    let currentWordIndex = 0;

    function updateText() {
      if (currentIndex >= words[currentWordIndex].length) {
        // wait for wordDelay before changing to the next word
        timeoutId = setTimeout(() => {
          currentWordIndex = (currentWordIndex + 1) % words.length;
          currentIndex = 0;
          setText(words[currentWordIndex].substring(0, currentIndex));
          updateText();
        }, wordDelay);
        return;
      }

      // add one letter to the text at a time
      currentIndex++;
      setText(words[currentWordIndex].substring(0, currentIndex));

      // wait for delay before adding the next letter
      timeoutId = setTimeout(updateText, delay);
    }

    updateText();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Flex
      width={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      className="web-main-section"
    >
      <VStack flex={50}>
        <Heading
          fontSize={'3rem'}
          isTruncated={true}
          noOfLines={3}
          marginLeft={'4rem'}
        >
          Find the most
          <br />
          relatable hindi
          <br />
          <Box display={'inline'} color={primaryColor}>
            {text}
          </Box>
        </Heading>
        <button
          className="primary-button web-button py-1"
          style={{ marginTop: '2rem' }}
          // to={'/new'}
          onClick={onOpen}
        >
          Read Now
        </button>
      </VStack>
      <Stack flex={50}>
        <Image src={WebFlower} />
      </Stack>
      <LoginPopup isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Flex>
  );
};

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

export default WebMain;
