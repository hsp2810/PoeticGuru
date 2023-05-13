import React, { useState } from 'react';
import PoemCard from './PoemCard';
import { Link } from 'react-router-dom';
import { HStack, Heading, Text } from '@chakra-ui/react';
import { handleScrollClick } from '../../../assets/utils/caraousel';
import '../../../assets/styles/caraousel.css';
import { useSelector } from 'react-redux';

const Poems = () => {
  const { latestPoems } = useSelector(state => state.poem);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerId, setContainerId] = useState(
    `scroll-container-${Math.random().toString(36).substr(2, 9)}`
  );

  return (
    <>
      <HStack>
        {latestPoems.length === 0 ? (
          <Text margin={'1rem 0rem'}>No poems to show</Text>
        ) : (
          <>
            <span
              className="material-symbols-outlined arrows arrows-poems"
              onClick={() =>
                handleScrollClick('left', setScrollPosition, containerId)
              }
            >
              arrow_back_ios_new
            </span>
            <div className="scroll-container" id={containerId}>
              {latestPoems.map(poem => (
                <Link
                  className="poem-card-link"
                  to={`/explore/poems/${poem._id}`}
                  key={poem._id}
                >
                  <PoemCard poem={poem} />
                </Link>
              ))}
            </div>
            <span
              className="material-symbols-outlined arrows arrows-poems"
              onClick={() =>
                handleScrollClick('right', setScrollPosition, containerId)
              }
            >
              arrow_forward_ios
            </span>
          </>
        )}
      </HStack>
    </>
  );
};

export default Poems;
