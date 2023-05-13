import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { actionGetQuote } from '../../../redux/actions/quoteActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { quote } from '../../../assets/utils/data';
import AuthorProfile from '../../../components/Utils/AuthorProfile';
import { exactDate } from '../../../assets/utils/date';
import CustomSpinner from '../../../components/Utils/CustomSpinner';

const quoteColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--primary-quotes-color'
);
const quoteSecBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--secondary-quotes-bg-color');

const Quote = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const { isLogin } = useSelector(state => state.user);

  useEffect(() => {
    if (isLogin) {
      fetchQuote();
    }
  }, [isLogin]);

  const fetchQuote = async () => {
    const quoteObj = await actionGetQuote(id);
    setQuote(quoteObj);
  };
  return (
    <>
      {!quote ? (
        <CustomSpinner />
      ) : (
        <>
          <Stack
            bg={quoteSecBgColor}
            padding={'1rem'}
            width={'100vw'}
            height={'100%'}
            margin={'1rem 0rem'}
          >
            <VStack spacing={0} alignItems={'flex-start'}>
              <Heading color={quoteColor}>{quote.title}</Heading>
              <Text fontSize={'sm'}>Posted on {exactDate(quote.postedOn)}</Text>
            </VStack>
            <Stack
              margin={'2rem 0rem !important'}
              alignItems={'center'}
              minH={'10vh'}
              justifyContent={'center'}
              p={'0rem 2rem'}
            >
              <Heading fontSize={'x-large'}>"{quote.content}"</Heading>
            </Stack>
            <VStack alignItems={'flex-start'}>
              <Box m={'1rem !important'}>
                <Heading children={'Quote Explanation'} fontSize={'lg'} />
                <Text>{quote.quoteMeaning}</Text>
              </Box>
              <Box m={'1rem !important'}>
                <Heading children={"Author's Incident "} fontSize={'lg'} />
                <Text>{quote.quoteIncident}</Text>
              </Box>
            </VStack>
            <HStack margin={'2rem 0rem !important'} justifyContent={'center'}>
              <button className="primary-button button-flex quote-button">
                <Text>Like</Text>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="primary-button button-flex quote-button">
                <Text>Add to favourites</Text>
                <span className="material-symbols-outlined">thumb_up</span>
              </button>
            </HStack>
          </Stack>
          <AuthorProfile color={quoteColor} name={quote.author} />
        </>
      )}
    </>
  );
};

export default Quote;
