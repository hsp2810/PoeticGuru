import { Flex } from '@chakra-ui/react';
import React from 'react';
import WebMain from '../../components/Webpage/WebMain';
import WebRecommendations from '../../components/Webpage/WebRecommendations';
import WebContent from '../../components/Webpage/Content/WebContent';

const WebPage = () => {
  return (
    <Flex flexDir={'column'}>
      <WebMain />
      <WebContent />
      <WebRecommendations />
    </Flex>
  );
};

export default WebPage;
