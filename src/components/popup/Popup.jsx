import { useContext } from 'react';
import { GeneralContext } from '../../App';
import './popup.css'
import { useNavigate } from 'react-router-dom';

function Popup() {
    const navigate = useNavigate();
    const { isDarkMode } = useContext(GeneralContext);

    return (
        <div className="modal-frame">
            <div className={`popup ${isDarkMode ? 'dark' : ''}`}>
                <h1>Congratulations!</h1>
                <p>
                    Your order has been received! 🎉 We are thrilled to be preparing your items for delivery,
                    you can watch your order details in your account page
                </p>
                <div>
                    <button className='back-to-shop-btn' onClick={() => navigate('/')}>Back To Shop</button>
                </div>
            </div>
        </div>
    )
}

export default Popup
