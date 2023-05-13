import React, { useEffect, useState } from 'react';
import {
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { actionGetPoem } from '../../../redux/actions/poemActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AuthorProfile from '../../../components/Utils/AuthorProfile';
import { exactDate } from '../../../assets/utils/date';
import CustomSpinner from '../../../components/Utils/CustomSpinner';

const poemColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--primary-color'
);
const poemSecBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--secondary-background-color');

const Poem = () => {
  const { id } = useParams();
  const [poem, setPoem] = useState(null);
  const { isLogin } = useSelector(state => state.user);

  useEffect(() => {
    if (isLogin) {
      fetchPoem();
    }
  }, [isLogin]);

  const fetchPoem = async () => {
    const poemObj = await actionGetPoem(id);

    if (poemObj) {
      const contentArr = poemObj.content.split('\n');
      setPoem({ ...poemObj, content: contentArr });
    }
  };

  return (
    <>
      {!poem ? (
        <CustomSpinner />
      ) : (
        <>
          <Stack
            bg={poemSecBgColor}
            padding={'1rem'}
            width={'100vw'}
            height={'100%'}
            margin={'1rem 0rem'}
          >
            <VStack spacing={0} alignItems={'flex-start'}>
              <Heading color={poemColor}>{poem.title}</Heading>
              <Text fontSize={'sm'}>Posted on {exactDate(poem.postedOn)}</Text>
            </VStack>
            <Stack
              margin={'5rem 0rem !important'}
              alignItems={'center'}
              minH={'10vh'}
              justifyContent={'center'}
            >
              {poem &&
                poem.content.map((line, index) => {
                  return (
                    <div key={index}>
                      <Text fontSize={'2xl'} color={'#000'} fontWeight={'bold'}>
                        {line}
                      </Text>
                    </div>
                  );
                })}
            </Stack>
            <HStack margin={'2rem 0rem !important'} justifyContent={'center'}>
              <button className="primary-button button-flex">
                <Text>Like</Text>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="primary-button button-flex">
                <Text>Add to favourites</Text>
                <span className="material-symbols-outlined">thumb_up</span>
              </button>
            </HStack>
          </Stack>
          <AuthorProfile color={poemColor} name={poem.author} />
        </>
      )}
    </>
  );
};

export default Poem;
