import React, { useEffect, useState } from 'react';
import { Alert, Badge, Flex, Heading, VStack } from '@chakra-ui/react';
import Poems from '../../../components/Explore/Poems/Poems';
import PoemSearch from '../../../components/Explore/Poems/PoemSearch';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionGetAllPoems,
  actionGetPoems24,
} from '../../../redux/actions/poemActions';

const ExplorePoems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPoems24();
    fetchAllPoems();
  }, []);

  const fetchPoems24 = async () => {
    await actionGetPoems24(dispatch);
  };

  const fetchAllPoems = async () => {
    await actionGetAllPoems(dispatch);
  };

  return (
    <Flex
      flexDir={'column'}
      padding={'1rem'}
      width={'80%'}
      margin={'2rem auto'}
    >
      <VStack mt={'2rem'}>
        <Alert
          bg={primaryColor}
          color={'whiteAlpha.900'}
          width={'fit-content'}
          borderRadius={'.5rem'}
        >
          <Heading children={'POSTED TODAY'} size={'lg'} pt={'.5rem'} />
          <Badge
            children={'NEW'}
            ml={3}
            colorScheme="red"
            position={'absolute'}
            top={0}
            right={0}
          />
        </Alert>

        <Poems />
      </VStack>
      <Flex flexDir={'column'} margin={'3rem'}>
        <Heading textAlign={'center'}>Find poems that suits you</Heading>
        <PoemSearch type="poems" />
      </Flex>
    </Flex>
  );
};

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

export default ExplorePoems;
