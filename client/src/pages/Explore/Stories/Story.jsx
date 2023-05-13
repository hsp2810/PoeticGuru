import React from 'react';
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
import { story } from '../../../assets/utils/data';
import AuthorProfile from '../../../components/Utils/AuthorProfile';

const storyColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--primary-stories-color'
);
const storySecBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--secondary-stories-bg-color');

const Story = () => {
  // const { id } = useParams();
  // const [poem, setPoem] = useState(null);
  // const { isLogin } = useSelector(state => state.user);

  // useEffect(() => {
  //   if (isLogin) {
  //     fetchPoem();
  //   }
  // }, [isLogin]);

  // const fetchPoem = async () => {
  //   const poemObj = await actionGetPoem(id);

  //   if (poemObj) {
  //     const contentArr = poemObj.content.split('\n');
  //     setPoem({ ...poemObj, content: contentArr });
  //   }
  // };
  return (
    <>
      <Stack
        bg={storySecBgColor}
        padding={'1rem'}
        width={'100vw'}
        height={'100%'}
        margin={'1rem 0rem'}
      >
        {!story ? (
          <Spinner size="xl" margin={'5rem auto'} />
        ) : (
          <>
            <VStack spacing={0} alignItems={'flex-start'}>
              <Heading color={storyColor}>{story.title}</Heading>
              <Text fontSize={'sm'}>Posted on {story.postedOn}</Text>
            </VStack>
            <Stack
              margin={'3rem 0rem !important'}
              alignItems={'center'}
              minH={'10vh'}
              justifyContent={'center'}
              p={'0rem 2rem'}
            >
              {story &&
                story.content.map((line, index) => {
                  return (
                    <div key={index}>
                      <Text
                        fontSize={'lg'}
                        color={'#000'}
                        fontWeight={'normal'}
                      >
                        {line}
                      </Text>
                    </div>
                  );
                })}
            </Stack>
            <HStack margin={'2rem 0rem !important'} justifyContent={'center'}>
              <button className="primary-button button-flex story-button">
                <Text>Like</Text>
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button className="primary-button button-flex story-button">
                <Text>Add to favourites</Text>
                <span className="material-symbols-outlined">thumb_up</span>
              </button>
            </HStack>
          </>
        )}
      </Stack>
      <AuthorProfile color={storyColor} name={story.author} />
    </>
  );
};

export default Story;
