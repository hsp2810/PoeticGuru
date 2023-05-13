import React from 'react';
import { Card, Text, Heading, CardBody, Stack, Badge } from '@chakra-ui/react';
import '../../../assets/styles/poems.css';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const storiesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-stories-bg-color');

const StoryCard = ({ title, postedOn, authorMessage, author, category }) => {
  return (
    <Card
      marginRight={'1rem'}
      width={'17vw'}
      bgColor={storiesBgColor}
      className="poem-card"
      minH={'24em'}
    >
      <CardBody margin={'0rem !important'}>
        <Badge colorScheme="red">New</Badge>
        <Stack mt="6" spacing="3">
          <Heading size="lg">{title}</Heading>
          <Text>{authorMessage}</Text>
          <Text>Posted on: {postedOn}</Text>
          <Text>Written by: {author}</Text>
          <Text>Category: {category}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default StoryCard;
