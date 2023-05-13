import React from 'react';
import {
  Card,
  Text,
  Heading,
  CardBody,
  Stack,
  Badge,
  HStack,
  Divider,
} from '@chakra-ui/react';
import '../../../assets/styles/poems.css';
import moment from 'moment';
import { firstCharUppercase } from '../../../assets/utils/text';

const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const PoemCard = ({ poem }) => {
  return (
    <Card
      bgColor={primaryBgColor}
      className="card poem-card"
      minH={'25em'}
      minW={'18vw !important'}
    >
      <CardBody margin={'0rem !important'}>
        <Badge colorScheme="red">New</Badge>
        <Stack mt="6" spacing="3">
          <Heading size="lg">{poem.title}</Heading>
          <Text>{poem.authorMessage}</Text>
          <Text>
            Category:{' '}
            {!poem.category
              ? 'No category'
              : firstCharUppercase(poem.category.name)}
          </Text>
          <Text>
            Language:{' '}
            {!poem.language
              ? 'No language'
              : firstCharUppercase(poem.language.name)}
          </Text>
          <HStack
            marginTop={'0.5rem'}
            alignItems={'center'}
            position={'absolute'}
            bottom={'1.5rem'}
          >
            <span className="material-symbols-outlined">favorite</span>
            <Text margin={'0.25rem !important'}>{poem.likes}</Text>
            <Divider orientation="vertical" />
            <span className="material-symbols-outlined">visibility</span>
            <Text margin={'0.25rem !important'}>{poem.views}</Text>
            <Divider orientation="vertical" />
            <span className="material-symbols-outlined">schedule</span>
            <Text margin={'0.25rem !important'}>
              {moment(poem.postedOn).fromNow()}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PoemCard;
