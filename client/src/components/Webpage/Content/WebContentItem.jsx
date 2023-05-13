import React from 'react';
import { Card, Text, Heading, CardBody, Stack } from '@chakra-ui/react';

const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const WebCategoryItem = ({ title, description, bgColor }) => {
  return (
    <Card maxW="sm" bgColor={bgColor}>
      <CardBody margin={'0rem !important'}>
        <Stack mt="6" spacing="3">
          <Heading size="lg">{title}</Heading>
          <Text>{description}.</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default WebCategoryItem;
