import { useContext, useEffect, useState } from 'react';
import './cart-styles/cart-style-1.css';
import './cart-styles/cart-style-2.css';
import { BsTrash3 } from "react-icons/bs";
import Counter from '../counter/Counter';
import { GeneralContext } from '../../App';
import { Link } from 'react-router-dom';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { PiSmileySadDuotone } from "react-icons/pi";

function Cart() {
    const [cartModal, setCartModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const cartImg = process.env.PUBLIC_URL + '/images/shopping-bag.png';
    const { count, setCount, cartProducts, setCartProducts, isDarkMode } = useContext(GeneralContext);
    const itemInCart = cartProducts.length;

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartProducts(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        let total = 0;
        cartProducts.forEach(item => {
            total += item.sale ? item.finalPrice * item.quantity : item.price * item.quantity;
        });
        setTotalPrice(total);
    }, [cartProducts]);

    const handleQuantityChange = (index, value) => {
        // Update the quantity of the item at the given index
        const updatedCart = [...cartProducts];
        updatedCart[index].quantity += value;
        if (updatedCart[index].quantity <= 0) {
            updatedCart.splice(index, 1);
        }
        setCartProducts(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        localStorage.removeItem('cart')
        setCartProducts([])
    }

    return (
        <>
            <div className='shopping-cart-box' onClick={() => { setCartModal(true); }}>
                <div className='products-in-cart'>{itemInCart > 0 ? itemInCart : ''}</div>
                <img className="cart-img" src={cartImg} alt="Cart" />     
            </div>

            {cartModal && (
                <div className="modal-frame" onClick={() => { setCartModal(false) }}>
                    <div className={`cart ${isDarkMode ? 'dark' : ''}`} onClick={(ev) => ev.stopPropagation()}>
                        <button className="close-btn" onClick={() => { setCartModal(false) }}>&times;</button>
                        <div className="cart-header">
                            <div>
                                <h1>My Cart</h1>
                                <div>Items: {cartProducts.length}</div>
                                <div>Total:{totalPrice.toFixed(2)}&#8362;</div>
                            </div>
                            <BsTrash3 onClick={clearCart} className="cart-trash" />
                        </div>

                        {cartProducts.length > 0 ? (
                            <>
                                <div className="cart-products">
                                    {cartProducts.map((cartItem, index) => (
                                        <div key={index} className="cart-card">
                                            <img className="cart-item-img" src={cartItem.img} />
                                            <div className='cart-item-title'>{cartItem.title}</div>
                                            <div className='cart-item-sum'>
                                                <span>{cartItem.quantity}-{cartItem.unit}</span>
                                                <div>
                                                    {cartItem.sale ? (
                                                        Number((cartItem.finalPrice * cartItem.quantity).toFixed(2))
                                                    ) : (
                                                        Number((cartItem.price * cartItem.quantity).toFixed(2))
                                                    )}
                                                    &#8362;
                                                </div>
                                            </div>
                                            <Counter count={cartItem.quantity} onChange={(value) => handleQuantityChange(index, value)} />
                                        </div>
                                    ))}
                                </div>
                                <p className={totalPrice > 50 ? 'remove-message' : 'minimum-message'}>
                                    *Please note minimum cost for delivery is 50&#8362;*
                                </p>
                                <div className={'cart-payout ' + (cartProducts.length > 6 ? "cart-payout-sticky" : "cart-payout-fixed")}>
                                    <Link to={'/checkout'}>
                                    <button disabled={totalPrice < 50} onClick={() => setCartModal(false)} >Go To Checkout</button>
                                    </Link>
                                </div>
                            </>
                        ) :
                         <div className='empty-cart-msg'>
                            <div className="custom-icon">
                                <PiMagnifyingGlassBold className="magnifying-glass" />
                                <PiSmileySadDuotone className="sad-smiley" />
                            </div>
                            <p>No Products was found... </p>
                        </div>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Cart;