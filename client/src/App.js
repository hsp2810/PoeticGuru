import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './assets/styles/main.css';
import './assets/styles/main.css';
import ExplorePoems from './pages/Explore/HindiPoems/ExplorePoems';
import ExploreStories from './pages/Explore/Stories/ExploreStories';
import ExploreQuotes from './pages/Explore/Quotes/ExploreQuotes';
import NewlyPosted from './pages/New/NewlyPosted';
import WebPage from './pages/Web/WebPage';
import Poem from './pages/Explore/HindiPoems/Poem';
import CustomAlert from './components/Utils/CustomAlert';
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthenticate } from './redux/actions/authActions';
import Profile from './pages/Profile/Profile';
import Story from './pages/Explore/Stories/Story';
import ScrollToTop from './components/Utils/ScrollToTop';
import Quote from './pages/Explore/Quotes/Quote';

const App = () => {
  const { isLogin } = useSelector(state => state.user);
  const { alertType, alertMessage } = useSelector(state => state.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticateUser = async () => {
    await actionAuthenticate(dispatch);
  };

  useEffect(() => {
    authenticateUser();
    const storedUrl = localStorage.getItem('lastUrl') || '/new';

    if (isLogin) {
      navigate(storedUrl);
    } else {
      navigate('/');
    }

    // Save the last visited URL in local storage before the page refreshes
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('lastUrl', window.location.pathname);
    });
  }, [isLogin]);

  return (
    <div className="app">
      {alertMessage && <CustomAlert type={alertType} message={alertMessage} />}
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<WebPage />} />
        <Route path="/new" element={<NewlyPosted />} />
        <Route path="/explore">
          <Route path="poems" element={<ExplorePoems />} />
          <Route path="poems/:id" element={<Poem />} />
          <Route path="stories" element={<ExploreStories />} />
          <Route path="stories/:id" element={<Story />} />
          <Route path="quotes" element={<ExploreQuotes />} />
          <Route path="quotes/:id" element={<Quote />} />
        </Route>
        <Route path="profile" element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
