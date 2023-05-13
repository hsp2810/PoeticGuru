import { Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Poems from '../../components/Explore/Poems/Poems';
import Quotes from '../../components/Explore/Quotes/Quotes';
import Stories from '../../components/Explore/Stories/Stories';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionGetAllPoems,
  actionGetPoems24,
} from '../../redux/actions/poemActions';
import { actionGetQuotes24 } from '../../redux/actions/quoteActions';

const poemsPrimaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const quotesPrimaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-quotes-color');
const storiesPrimaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-stories-color');

const NewlyPosted = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPoems24();
    fetchQuotes24();
  }, []);

  const fetchPoems24 = async () => {
    await actionGetPoems24(dispatch);
  };

  const fetchQuotes24 = async () => {
    await actionGetQuotes24(dispatch);
  };

  return (
    <Flex flexDir={'column'} padding={'1rem'} width={'90%'} margin={'auto'}>
      <VStack className="posted-today-container" marginTop={'2rem'}>
        <HStack alignItems={'center'} width={'100%'} justifyContent={'center'}>
          <Heading textAlign={'center'}>Poems</Heading>
          <Text
            margin={'0.5rem 0rem 0rem 1rem !important'}
            color={poemsPrimaryColor}
          >
            <Link to={'/explore/poems'}>Explore</Link>
          </Text>
        </HStack>
        <Poems />
      </VStack>
      <VStack marginTop={'2rem'} className="posted-today-container">
        <HStack alignItems={'center'} width={'100%'} justifyContent={'center'}>
          <Heading>Quotes</Heading>
          <Text
            margin={'0.5rem 0rem 0rem 1rem !important'}
            color={quotesPrimaryColor}
          >
            <Link to={'/explore/quotes'}>Explore</Link>
          </Text>
        </HStack>
        <Quotes />
      </VStack>
      <VStack marginTop={'2rem'} className="posted-today-container">
        <HStack alignItems={'center'} width={'100%'} justifyContent={'center'}>
          <Heading>Stories</Heading>
          <Text
            margin={'0.5rem 0rem 0rem 1rem !important'}
            color={storiesPrimaryColor}
          >
            <Link to={'/explore/stories'}>Explore</Link>
          </Text>
        </HStack>
        <Stories />
      </VStack>
    </Flex>
  );
};

export default NewlyPosted;
