import React from 'react';
import { Flex, Heading, Stack, VStack } from '@chakra-ui/react';
import Stories from '../../../components/Explore/Stories/Stories';

const ExploreStories = () => {
  return (
    <Flex
      flexDir={'column'}
      padding={'1rem'}
      width={'80%'}
      margin={'2rem auto'}
    >
      <VStack className="posted-today-container">
        <Heading>Posted today</Heading>
        <Stories />
      </VStack>
      <Flex flexDir={'column'} margin={'3rem'}>
        <Heading textAlign={'center'}>Find poems that suits you</Heading>
        {/* <StorySearch /> */}
      </Flex>
      <VStack>
        <Heading textAlign={'left'}>
          10 poems found based on your search
        </Heading>
        <Stories />
      </VStack>
    </Flex>
  );
};

export default ExploreStories;
