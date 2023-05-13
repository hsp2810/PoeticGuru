import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Heading,
  Input,
  Spinner,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import '../../../assets/styles/quotes.css';
import '../../../assets/styles/stories.css';
import PoemCard from './PoemCard';
import { Link } from 'react-router-dom';
import CustomSpinner from '../../Utils/CustomSpinner';
import QuoteCard from '../Quotes/QuoteCard';
import StoryCard from '../Stories/StoryCard';
import { useSelector } from 'react-redux';

const PoemSearch = props => {
  const { poems } = useSelector(state => state.poem);
  const { quotes } = useSelector(state => state.quote);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (props.type === 'poems') {
      setFilteredData(poems);
    } else if (props.type === 'quotes') {
      setFilteredData(quotes);
    }
  }, [poems, quotes]);

  const handleInputChange = e => {
    const userInput = e.target.value;
    if (userInput === '') {
      setFilteredData(props.data);
    } else {
      setFilteredData(
        props.data.filter(dataItem => {
          return (
            dataItem.title.includes(userInput) ||
            dataItem.category.name.includes(userInput)
          );
        })
      );
    }
  };

  return (
    <>
      {!poems ? (
        'Wait'
      ) : (
        <Flex
          justifyContent={'center'}
          flexDir={'column'}
          margin={'1rem 0rem'}
          minHeight={'50vh'}
          alignItems={'center'}
        >
          <form style={{ width: '100%' }}>
            <input
              type="search"
              className={`search ${
                props.type === 'poems'
                  ? 'poem-search'
                  : props.type === 'quotes'
                  ? 'quote-search'
                  : 'story-search'
              }`}
              placeholder={`Search by ${props.type}, category`}
              onChange={handleInputChange}
            />
          </form>
          <SearchResult type={props.type} filteredData={filteredData} />
        </Flex>
      )}
    </>
  );
};

const SearchResult = ({ type, filteredData }) => {
  return (
    <>
      <Flex mt={'3rem'}>
        {!filteredData ? (
          'No data to show'
        ) : filteredData.length === 0 ? (
          <CustomSpinner />
        ) : (
          <Flex flexDir={'column'} alignItems={'center'}>
            <Heading
              children={`${filteredData.length} poems found`}
              size={'md'}
              w={'100%'}
            />
            <HStack m={'1rem 0rem'}>
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {filteredData.map(dataItem => {
                  return (
                    <GridItem key={dataItem._id}>
                      <Link
                        className="poem-card-link"
                        to={`/explore/poems/${dataItem._id}`}
                      >
                        {type === 'poems' ? (
                          <PoemCard poem={dataItem} />
                        ) : type === 'quotes' ? (
                          <QuoteCard quote={dataItem} />
                        ) : (
                          <StoryCard story={dataItem} />
                        )}
                      </Link>
                    </GridItem>
                  );
                })}
              </Grid>
            </HStack>
          </Flex>
        )}
      </Flex>
    </>
  );
};

{
  /* <Flex mt={'1rem'}>
{!filteredData ? (
  <Heading
    textAlign={'center'}
    children={'No poems to show'}
    size={'md'}
  />
) : filteredData.length === 0 ? (
  <Spinner />
) : (
  <Flex flexDir={'column'} justifyContent={'flex-start'}>
    <Heading
      children={`${filteredData.length} poems found based on your search`}
      size={'md'}
      w={'100%'}
    />
    <HStack>
      {filteredData.map(poem => {
        return <PoemCard poem={poem} />;
      })}
    </HStack>
  </Flex>
)}
</Flex> */
}
export default PoemSearch;
