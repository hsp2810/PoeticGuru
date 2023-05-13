import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  background,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const poemsBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');
const quotesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-quotes-bg-color');
const storiesBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-stories-bg-color');

const ContentMenu = () => {
  return (
    <Menu>
      <MenuButton
        color={primaryColor}
        as={Button}
        variant={'link'}
        rightIcon={<ChevronDownIcon marginLeft={'-0.5rem !important'} />}
      >
        Explore
      </MenuButton>
      <MenuList>
        <MenuItem _hover={{ backgroundColor: poemsBgColor }} padding={'1rem'}>
          <Link to="/explore/poems">Poems</Link>
        </MenuItem>
        <MenuItem _hover={{ backgroundColor: quotesBgColor }} padding={'1rem'}>
          <Link to="/explore/quotes">Quotes</Link>
        </MenuItem>
        <MenuItem _hover={{ backgroundColor: storiesBgColor }} padding={'1rem'}>
          <Link to="/explore/stories">Talks/Stories</Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ContentMenu;
