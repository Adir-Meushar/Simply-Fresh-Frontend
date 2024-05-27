import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar-styles/navbar.css';
import './navbar-styles/navbar-buttons.css';
import './navbar-styles/navbar-responsive.css';
import Signup from '../../authentication/SignupModal';
import Login from '../../authentication/LoginModal';
import Logout from '../../authentication/Logout';
import { GeneralContext, RoleType } from '../../App';
import CategoryNavbar from './category-navbar/CategoryNavbar';
import Cart from '../cart/Cart';
import SearchBar from '../searchbar/SearchBar';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { user, isDarkMode, setIsDarkMode, isSmallScreen, setIsSmallScreen } = useContext(GeneralContext);

  const logo = process.env.PUBLIC_URL + '/images/leaves.png';

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const shouldRender = ['/vegetables', '/fruits', '/bakery', '/dairy&eggs', '/'].includes(location.pathname);
  
  return (
    <>
      <div className='nav-container'>
        <nav className={`top-nav ${isDarkMode ? 'dark' : ''}`}>
          <Link to="/">
            <div className='logo-box'>
              <img className='logo' src={logo} alt="logo" />
              <div className='site-name'>SimplyFresh</div>
            </div>
          </Link>
          <ul className={clicked ? 'navbar active' : 'navbar'}>
            <div className='link-box'>
              {shouldRender &&
                <li className='remove-search'><SearchBar /></li>
              }
            </div>

            {isSmallScreen ? (shouldRender ? <CategoryNavbar handleClick={handleClick} /> :
              <div onClick={() => { navigate('/'); handleClick(); }} className="icon icon-rotate home-icon"><i className="fa fa-home"></i></div>)
              : ''}

            {user ? (
              <>
                <div className='user-box'>
                  <Logout handleClick={handleClick} />
                  <div onClick={() => { navigate('/my-account'); handleClick(); }} className="icon icon-enter">
                    <i className="fa fa-user"></i>
                  </div>
                  {user?.roleType == RoleType.admin ?
                    <div onClick={() => { navigate('/dashboard'); handleClick(); }} className="icon icon-fill">
                      <ImStatsDots className='admin-icon' />
                    </div>
                    : ''}
                  <div className='remove-cart'><Cart /></div>
                </div>
              </>
            ) : (
              <>
                <div className='guest-box'>
                  <li><Signup /></li>
                  <li><Login /></li>
                </div>
              </>
            )}
          </ul>

          {
            !isDarkMode ?
              <div className="icon icon-expand" onClick={() => setIsDarkMode(true)}>
                <MdOutlineDarkMode className='theme-btn' /> </div> :
              <div className="icon icon-expand" onClick={() => setIsDarkMode(false)}>
                <MdOutlineLightMode className='theme-btn' /></div>
          }

          {user ? <div className='cart-mobile'> <Cart /></div> : ''}

          <div className='mobile' onClick={handleClick}>
            <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>

        {isSmallScreen ? (shouldRender ? <SearchBar /> : null) : <CategoryNavbar />}

      </div>
    </>
  );
};

export default Navbar;
