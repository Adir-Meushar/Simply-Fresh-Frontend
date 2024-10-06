import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import './App.css';
import CenteredLayout from './components/main-content/CenterdLayout';
import Router from './components/routes/Router';
import Navbar from './components/navbars/Navbar';
import Snackbar from './components/snackbar/Snackbar';
import Footer from './components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import Loader from './components/loader/Loader';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Toast from './components/toastMessage/Toast';

export const GeneralContext = createContext();


export const RoleType = {
  user: 10,
  admin: 20,
};

function App() {
  const [user, setUser] = useState();
  const [count, setCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [snackbarText, setSnackbarText] = useState('')
  const [loader, setLoader] = useState(true);
  const [gridLoader, setGridLoader] = useState(false)
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignModal] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('')
  const [toastBgColor, setToastBgColor] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const { currentUser } = decodedToken;
        setUser(currentUser)
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          navigate('/')
        }
      }
    };
    getCurrentUser();
    setLoader(false)
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const showToastMessage = (message, bgColor) => {
    setToastMessage(message);
    setToastBgColor(bgColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  return (
    <GeneralContext.Provider value={{
      snackbar, user, setUser, count, setCount,
      cartProducts, setCartProducts, search, setSearch,
      setLoader, loader, setGridLoader, gridLoader,
      isDarkMode, setIsDarkMode, loginModal, setLoginModal,
      signupModal, setSignModal, isSmallScreen, setIsSmallScreen,
      showToastMessage
    }}>

      <ScrollToTop />
      <CenteredLayout>
        <Navbar />
        <Router />
        <Footer />
        {loader && <Loader />}
        {snackbarText && <Snackbar text={snackbarText} />}
        {showToast && <Toast message={toastMessage} bgColor={toastBgColor} visible={showToast} />}
      </CenteredLayout>
    </GeneralContext.Provider>
  );
}

export default App;
