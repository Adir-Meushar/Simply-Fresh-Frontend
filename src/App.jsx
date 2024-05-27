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
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignModal] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const { currentUser } = decodedToken;
        setUser(currentUser)

        console.log(currentUser);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          // Token is expired, remove it from local storage
          localStorage.removeItem("token");
          navigate('/')
        }
      }
    };
    getCurrentUser();
    setLoader(false)
  }, []);

  useEffect(() => {
    // Prevent scrolling when loader is visible
    if (loader) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden'; // Disable horizontal scrollbar
    }
  }, [loader]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const snackbar = (text) => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(""), 3 * 1000);
  };

  return (
    <GeneralContext.Provider value={{
      snackbar, user, setUser, count, setCount,
      cartProducts, setCartProducts, search, setSearch,
      setLoader, isDarkMode, setIsDarkMode, loginModal, setLoginModal, signupModal, setSignModal,
       isSmallScreen, setIsSmallScreen
    }}>
      <CenteredLayout>
        <Navbar />
        <Router />
        <Footer />
        {loader && <Loader />}
        {snackbarText && <Snackbar text={snackbarText} />}
      </CenteredLayout>
    </GeneralContext.Provider>
  );
}

export default App;
