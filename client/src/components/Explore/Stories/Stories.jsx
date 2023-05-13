import React, { useState } from 'react';
import { poems } from '../../../assets/utils/data';
import { Flex, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons';
import StoryCard from './StoryCard';
import { handleScrollClick } from '../../../assets/utils/caraousel';

const Stories = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerId, setContainerId] = useState(
    `scroll-container-${Math.random().toString(36).substr(2, 9)}`
  );

  return (
    <HStack>
      <span
        className="material-symbols-outlined arrows arrows-stories"
        onClick={() =>
          handleScrollClick('left', setScrollPosition, containerId)
        }
      >
        arrow_back_ios_new
      </span>
      <div className="scroll-container" id={containerId}>
        {poems.map((poem, index) => (
          <Link
            className="poem-card-link"
            to={'/explore/stories/1'}
            key={index}
          >
            <StoryCard
              title={poem.title}
              postedOn={poem.postedOn}
              authorMessage={poem.authorMessage}
              author={poem.author}
            />
          </Link>
        ))}
      </div>
      <span
        className="material-symbols-outlined arrows arrows-stories"
        onClick={() =>
          handleScrollClick('right', setScrollPosition, containerId)
        }
      >
        arrow_forward_ios
      </span>
    </HStack>
  );
};

export default Stories;
