import React, { useState } from 'react';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import QuoteCard from './QuoteCard';
import { handleScrollClick } from '../../../assets/utils/caraousel';
import '../../../assets/styles/caraousel.css';
import { useSelector } from 'react-redux';

const Quotes = () => {
  const { latestQuotes } = useSelector(state => state.quote);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerId, setContainerId] = useState(
    `scroll-container-${Math.random().toString(36).substr(2, 9)}`
  );

  return (
    <HStack>
      {latestQuotes.length === 0 ? (
        <Text margin={'1rem 0rem'}>No quotes to show</Text>
      ) : (
        <>
          <span
            className="material-symbols-outlined arrows arrows-quotes"
            onClick={() =>
              handleScrollClick('left', setScrollPosition, containerId)
            }
          >
            arrow_back_ios_new
          </span>
          <div className="scroll-container" id={containerId}>
            {latestQuotes.map(quote => (
              <Link
                className="quote-card-link"
                to={`/explore/quotes/${quote._id}`}
                key={quote._id}
              >
                <QuoteCard quote={quote} />
              </Link>
            ))}
          </div>
          <span
            className="material-symbols-outlined arrows arrows-quotes"
            onClick={() =>
              handleScrollClick('right', setScrollPosition, containerId)
            }
          >
            arrow_forward_ios
          </span>
        </>
      )}
    </HStack>
  );
};

export default Quotes;
