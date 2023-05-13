import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormControl,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { actionLogin, actionRegister } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue('--primary-color');

const LoginPopup = ({ isOpen, onOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent p={'1rem'}>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            isLazy
            index={activeTab}
          >
            <TabList>
              <Tab onClick={() => setActiveTab(0)}>Login</Tab>
              <Tab onClick={() => setActiveTab(1)}>Signup</Tab>
            </TabList>

            <TabPanels>
              <LoginPanel />
              <RegisterPanel setActiveTab={setActiveTab} />
            </TabPanels>
          </Tabs>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

const LoginPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    actionLogin({ email, password }, dispatch, navigate);
  };

  return (
    <TabPanel display={'flex'} flexDir={'column'} alignItems={'center'}>
      <Heading fontSize={'2xl'}>Login</Heading>
      <FormControl m={'1rem 0rem'}>
        <Input
          variant="filled"
          placeholder="Enter your email"
          m={'0.5rem 0rem'}
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          variant="filled"
          placeholder="Enter your password"
          m={'0.5rem 0rem'}
          name="password"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>
      <button
        className="primary-button web-button"
        style={{ marginTop: '2rem' }}
        onClick={handleLogin}
      >
        Login
      </button>
    </TabPanel>
  );
};

const RegisterPanel = ({ setActiveTab }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    actionRegister({ name, email, password }, dispatch);
    setActiveTab(0);
  };

  return (
    <TabPanel display={'flex'} flexDir={'column'} alignItems={'center'}>
      <Heading fontSize={'2xl'}>Signup</Heading>
      <FormControl m={'1rem 0rem'}>
        <Input
          variant="filled"
          placeholder="Enter your name"
          m={'0.5rem 0rem'}
          name="email"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          variant="filled"
          placeholder="Enter your email"
          m={'0.5rem 0rem'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          variant="filled"
          placeholder="Enter your password"
          m={'0.5rem 0rem'}
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        {/* <Text>
          By registering you agree to all our <Link>Terms and Conditions.</Link>
        </Text> */}
      </FormControl>
      <button
        className="primary-button web-button"
        style={{ marginTop: '2rem' }}
        onClick={handleRegister}
      >
        Signup
      </button>
    </TabPanel>
  );
};

export default LoginPopup;
