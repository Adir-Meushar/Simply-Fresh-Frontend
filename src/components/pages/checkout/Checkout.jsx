import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './checkout-styles/checkout.css'
import './checkout-styles/checkout-payment.css'
import { useNavigate } from 'react-router-dom';
import { checkoutSchema } from './checkoutValid';
import { GeneralContext } from '../../../App';
import Popup from '../../popup/Popup';

function Checkout() {
    const { cartProducts, setCartProducts, snackbar, user, isDarkMode } = useContext(GeneralContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cardExpiredData, setCardExpiredData] = useState();
    const [deliveryDate, setDeliveryDate] = useState(Date.now());
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({})
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let total = 0;
        cartProducts.forEach(item => {
            total += item.sale ? item.finalPrice * item.quantity : item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cartProducts]);

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDeliveryDate(tomorrow);
        handleValid({ target: { name: 'deliveryDate', value: tomorrow } });
    }, []);

    const handleValid = (ev) => {
        const { name, value } = ev.target;
        const obj = { ...formData, [name]: value }
        setFormData(obj)
        const validate = checkoutSchema.validate(obj, { abortEarly: false })
        const tempErrors = { ...errors }
        delete tempErrors[name];
        if (validate.error) {
            const item = validate.error.details.find((e) => e.context.key == name)
            if (item) {
                tempErrors[name] = item.message;
            }
        }
        setIsFormValid(!validate.error)
        setErrors(tempErrors)
    }

    const createOrder = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/orders/create', {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.token,
                },
                body: JSON.stringify({
                    cart: cartProducts,
                    deliveryDate: deliveryDate // Include deliveryDate in the request body
                }),
            });
            const data = await response.json();
            if (data.error) {
                console.log(data.error);
            } else {
                setCartProducts([]);
                localStorage.removeItem('cart');
                setPopup(true)
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <>
            <form onSubmit={createOrder} className={`payment-form ${isDarkMode ? 'dark' : ''}`}>
                <h1>Checkout</h1>
                <div className='order-details'>
                    <h3>Order details</h3>
                    <div className='cart-details'>
                        <div className='cart-summary'>
                            <span>Items:{cartProducts.length}</span>
                            <span>Total:{totalPrice.toFixed(2)}&#8362;</span>
                        </div>
                        <div className='cart-items'>
                            {cartProducts.map(p => (
                                <div className='item' key={p.id}>
                                    {p.quantity} {p.unit}-{p.title}:
                                    {p.sale === true ? Number((p.finalPrice * p.quantity).toFixed(2)) :
                                        Number((p.price * p.quantity).toFixed(2))}&#8362;
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='delivry-box'>
                    <label> Choose Date For Delivery:
                        <DatePicker
                            name="deliveryDate"
                            selected={deliveryDate}
                            onChange={(date) => {
                                setDeliveryDate(date);
                                handleValid({ target: { name: 'deliveryDate', value: date } });
                            }}
                            dateFormat="dd/MM/yyyy"
                            className='card-fields'
                        />
                        {errors && errors.deliveryDate && (
                            <div className="error-message">{errors.deliveryDate}</div>
                        )}
                    </label>
                    <p>**Your delivery will be sent to the address currently saved in your account.
                        Feel free to update it in the account settings if needed
                    </p>
                </div>
                <div className='card-details'>
                    <h3>Card-details</h3>
                    <label>Card Holder:
                        <input name="cardHolder" autoComplete='off' type="text"
                            placeholder='Card Holder' className='card-fields'
                            onChange={handleValid} />
                        {errors && errors.cardHolder && (
                            <div className="error-message">{errors.cardHolder}</div>
                        )}
                    </label>
                    <label>Card number:
                        <input name="cardNumber" placeholder='Card Number' type="number"
                            className='card-fields' 
                            onChange={handleValid} />
                        {errors && errors.cardNumber && (
                            <div className="error-message">{errors.cardNumber}</div>
                        )}
                    </label>
                    <label>CVV:
                        <input name="cvv" placeholder='CVV' type="number"
                            className='card-fields' 
                            onChange={handleValid} />
                        {errors && errors.cvv && (
                            <div className="error-message">{errors.cvv}</div>
                        )}
                    </label>
                    <label>Expiration Date:
                        <DatePicker
                            name="expirationDate"
                            selected={cardExpiredData}
                            onChange={(date) => {
                                setCardExpiredData(date);
                                handleValid({ target: { name: 'expirationDate', value: date } });
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select expiration date"
                            className='card-fields'
                            autoComplete='off'
                        />
                        {errors && errors.expirationDate && (
                            <div className="error-message">{errors.expirationDate}</div>
                        )}
                    </label>
                </div>
                <button className='payment-btn' disabled={!isFormValid || totalPrice < 50}>Order & Pay</button>
            </form>
            {totalPrice <= 0 && popup === false ? 
            <div>
                <button className='back-to-shop-btn' onClick={() => navigate('/')}>Back To Shopping</button>
            </div> : ''}
            {popup && (
                <Popup />
            )}
        </>
    );
}

export default Checkout;

