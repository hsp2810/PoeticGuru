import React, { useEffect } from 'react';
import { Alert, Badge, Flex, Heading, VStack } from '@chakra-ui/react';
import Quotes from '../../../components/Explore/Quotes/Quotes';
import PoemSearch from '../../../components/Explore/Poems/PoemSearch';
import { useDispatch } from 'react-redux';
import {
  actionGetAllQuotes,
  actionGetQuotes24,
} from '../../../redux/actions/quoteActions';

const ExploreQuotes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchQuotes();
    fetchAllQuotes();
  }, []);

  const fetchQuotes = async () => {
    await actionGetQuotes24(dispatch);
  };

  const fetchAllQuotes = async () => {
    await actionGetAllQuotes(dispatch);
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
          bg={primaryQuotesColor}
          color={'whiteAlpha.900'}
          width={'fit-content'}
          borderRadius={'.5rem'}
        >
          <Heading children={'POSTED TODAY'} size={'lg'} pt={'.5rem'} />
          <Badge
            children={'NEW'}
            ml={3}
            colorScheme="purple"
            position={'absolute'}
            top={0}
            right={0}
          />
        </Alert>

        <Quotes />
      </VStack>
      <Flex flexDir={'column'} margin={'3rem'}>
        <Heading textAlign={'center'}>Find quotes that suits you</Heading>
        <PoemSearch type={'quotes'} />
      </Flex>
    </Flex>
  );
};

const primaryQuotesColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-quotes-color');

export default ExploreQuotes;
