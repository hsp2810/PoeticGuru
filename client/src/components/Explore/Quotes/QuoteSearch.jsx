import { SearchIcon } from '@chakra-ui/icons';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import '../../../assets/styles/quotes.css';
import '../../../assets/styles/stories.css';

const QuoteSearch = () => {
  return (
    <Stack margin={'1rem 0rem'}>
      <form>
        <input
          type="search"
          className="quotes-search"
          placeholder="Search by poem, category"
        />
        <button className="search-button quotes-search-button">
          <SearchIcon />
        </button>
      </form>
    </Stack>
  );
};

export default QuoteSearch;
