import { Flex, HStack, Heading } from '@chakra-ui/react';
import React from 'react';
import WebCategoryItem from './WebContentItem';

const poemBgColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--primary-background-color'
);
const quotesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-quotes-bg-color');
const storiesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-stories-bg-color');

const WebContent = () => {
  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      margin={'2rem 0rem'}
    >
      <Heading fontSize={'2.5rem'}>Content we provide</Heading>
      <HStack margin={'2rem 0rem'}>
        <WebCategoryItem
          title={'Poetry'}
          description={descriptionArr[0]}
          bgColor={poemBgColor}
        />
        <WebCategoryItem
          title={'Quotes'}
          description={descriptionArr[1]}
          bgColor={quotesBgColor}
        />
        <WebCategoryItem
          title={'Stories'}
          description={descriptionArr[2]}
          bgColor={storiesBgColor}
        />
      </HStack>
    </Flex>
  );
};

const descriptionArr = [
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quia, at error tempore dolorum vitae necessitatibus mollitia autem et vero dicta, harum quo. Hic harum consectetur delectus distinctio obcaecati tenetur voluptates temporibus dicta optio?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quia, at error tempore dolorum vitae necessitatibus mollitia autem et vero dicta, harum quo. Hic harum consectetur delectus distinctio obcaecati tenetur voluptates temporibus dicta optio?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quia, at error tempore dolorum vitae necessitatibus mollitia autem et vero dicta, harum quo. Hic harum consectetur delectus distinctio obcaecati tenetur voluptates temporibus dicta optio?',
];

export default WebContent;
