import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import '../../assets/styles/navbar.css';
import ContentMenu from './ContentMenu';
import { useDispatch, useSelector } from 'react-redux';
import { actionLogin, actionLogout } from '../../redux/actions/authActions';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Navbar = () => {
  const { isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('lastUrl');
    actionLogout(dispatch);
  };

  return (
    <Flex
      padding={'1rem'}
      justifyContent={'space-around'}
      width={'100%'}
      alignItems={'center'}
    >
      <Heading>
        <Link to="/">PoeticGURU</Link>
      </Heading>
      <HStack>
        {isLogin && (
          <>
            <NavbarItem link={'/new'} title={'Newly posted'} />
            <ContentMenu />
            <NavbarItem link={'/contact'} title={'Favourites'} />
            <NavbarItem link={'/profile'} title={'Profile'} />
          </>
        )}
        {!isLogin && (
          <>
            <NavbarItem link={'/about'} title={'About'} />
            <NavbarItem link={'/contact'} title={'Contact'} />
          </>
        )}
      </HStack>
      <HStack alignItems={'center'}>
        <ButtonGroup spacing={2}>
          <button className="primary-button">Subscribe</button>
          {isLogin && (
            <Button
              colorScheme="red"
              p={'1.65rem 1rem'}
              borderRadius={'2rem'}
              color="#fff"
              fontWeight={'600'}
              onClick={handleLogout}
            >
              <LogoutOutlinedIcon />
            </Button>
          )}
        </ButtonGroup>
      </HStack>
    </Flex>
  );
};

const NavbarItem = props => {
  return (
    <Link className="nav-links" to={props.link}>
      {props.title}
    </Link>
  );
};

export default Navbar;
