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

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');
const primaryBgColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-background-color');

const CategoriesMenu = () => {
  return (
    <Menu>
      <MenuButton
        color={primaryColor}
        as={Button}
        variant={'link'}
        rightIcon={<ChevronDownIcon marginLeft={'-0.5rem !important'} />}
      >
        Categories
      </MenuButton>
      <MenuList>
        <MyMenuItem title="Romantic" />
        <MyMenuItem title="Breakup" />
        <MyMenuItem title="Funny" />
        <MyMenuItem title="Emotional" />
        <MyMenuItem title="Motivational" />
      </MenuList>
    </Menu>
  );
};

const MyMenuItem = props => {
  return (
    <MenuItem _hover={{ backgroundColor: primaryBgColor }}>
      {props.title}
    </MenuItem>
  );
};

export default CategoriesMenu;
