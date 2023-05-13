import React from 'react';
import {
  Card,
  Text,
  Heading,
  CardBody,
  Stack,
  Badge,
  Divider,
  HStack,
} from '@chakra-ui/react';
import '../../../assets/styles/quotes.css';
import { firstCharUppercase } from '../../../assets/utils/text';
import moment from 'moment';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const quotesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-quotes-bg-color');

const QuoteCard = ({ quote }) => {
  return (
    <Card
      bgColor={quotesBgColor}
      className="card quote-card"
      minH={'25em'}
      minW={'18vw !important'}
    >
      <CardBody margin={'0rem !important'}>
        <Badge colorScheme="red">New</Badge>
        <Stack mt="6" spacing="3">
          <Heading size="lg">{quote.title}</Heading>
          <Text>{quote.authorMessage}</Text>
          <Text fontWeight={'semibold'}>{quote.content}</Text>
          <Text>
            Category:{' '}
            {!quote.category
              ? 'No category'
              : firstCharUppercase(quote.category.name)}
          </Text>
          <Text>
            Language:{' '}
            {!quote.language
              ? 'No language'
              : firstCharUppercase(quote.language.name)}
          </Text>
          <HStack
            marginTop={'0.5rem'}
            alignItems={'center'}
            position={'absolute'}
            bottom={'1.5rem'}
          >
            <span className="material-symbols-outlined">favorite</span>
            <Text margin={'0.25rem !important'}>{quote.likes}</Text>
            <Divider orientation="vertical" />
            <span className="material-symbols-outlined">visibility</span>
            <Text margin={'0.25rem !important'}>{quote.views}</Text>
            <Divider orientation="vertical" />
            <span className="material-symbols-outlined">schedule</span>
            <Text margin={'0.25rem !important'}>
              {moment(quote.postedOn).fromNow()}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuoteCard;
