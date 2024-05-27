import './footer.css'
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { useContext } from 'react';

function Footer() {
    
    const {isDarkMode} = useContext(GeneralContext)

    return (
        <div className={`footer ${isDarkMode ? 'dark' : ''}`}>
            <div className="am-footer section-padding">
                <div className="footer-links">
                    <div className="footer-links-div">
                        <h4>Categoty</h4>
                        <Link to={'/vegetables'}>
                        <p>Vegetables</p>
                        </Link>
                        <Link to={'/fruits'}>
                        <p>Fruits</p>
                        </Link>
                        <Link to={'/bakery'}>
                        <p>Bakery</p>
                        </Link>
                        <Link to={'/dairy&eggs'}>
                        <p>Dairy&eggs</p>
                        </Link>
                    </div>
                    <div className="footer-links-div">
                        <h4>Simply Fresh</h4>
                        <Link to={'/about'}>
                        <p>About</p>
                        </Link>
                        <Link to={'/f&q'}>
                            <p>FAQ</p>
                         </Link>
                         <Link to={'/contact'}>
                            <p>Contact Us</p>
                         </Link>
                    </div>
                    <div className="footer-links-div">
                        <h4 className='social-media-header'>Follow Us</h4>
                        <div className="social-media">
                           <a href="https://www.facebook.com/?locale=he_IL" target='_blank' rel='noreferrer noopener'><div className='media-icon'><BsFacebook/></div></a> 
                           <a href="https://www.instagram.com/" target='_blank' rel='noreferrer noopener'><div className='media-icon'><BsInstagram/></div></a> 
                           <a href="https://www.youtube.com/" target='_blank' rel='noreferrer noopener'><div className='media-icon'><BsYoutube/></div></a> 
                           <a href="https://www.linkedin.com/login" target='_blank' rel='noreferrer noopener'><div className='media-icon'><BsLinkedin/> </div></a>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="footer-below">
                    <div className="footer-copyright">
                        <p>© 2024 Simply Fresh. All rights reserved.</p>
                    </div>
                    <div className="footer-below-links">
                        <a href=""><div><p>Terms of conditions</p></div></a>
                        <a href=""><div><p>Privacy</p></div></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
