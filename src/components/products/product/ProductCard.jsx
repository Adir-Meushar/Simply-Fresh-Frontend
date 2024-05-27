import { useState, useEffect, useContext } from 'react';
import Counter from '../../counter/Counter';
import ProductDetails from './ProductDetails';
import { GeneralContext } from '../../../App';

function ProductCard({ item }) {
  const [modal, setModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState(0);
  const { user, cartProducts, setCartProducts, isDarkMode } = useContext(GeneralContext)

  useEffect(() => {
    if (item) {
      const foundItemIndex = cartProducts.findIndex(product => product.id === item._id);
      if (foundItemIndex !== -1) {
        const foundItem = cartProducts[foundItemIndex];
        if (foundItem.quantity > 0) {
          setCount(foundItem.quantity);
        } else {
          // Remove item from cartProducts
          const newCartProducts = [...cartProducts]; 
          newCartProducts.splice(foundItemIndex, 1); 
          setCartProducts(newCartProducts); 
        }
      }
    }
  }, [cartProducts, item]);


  const handleCardClick = () => {
    setModal(true);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleCountChange = (value) => {
    const newCount = count + value;
    if (newCount >= 0) {
      setCount(newCount);
      updateCart(
        item._id,
        newCount,
        item.price,
        item.finalPrice,
        item.title,
        item.img.url,
        item.unit,
        item.sale
      );
    }
  };

  const updateCart = (productId, quantity, price, finalPrice, title, imgUrl, unit, sale) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity = quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity,
        price: price,
        finalPrice: finalPrice,
        title: title,
        img: imgUrl,
        unit: unit,
        sale: sale
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartProducts(cart)
  };

  return (
    <div className="card"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={item.img.url} alt={item.title} className="card-image" />
      <div className={`card-content ${isDarkMode ? 'dark' : ''}`}>
        <h3 className="card-title">{item.title}</h3>
        <div className="card-price">
          {item.sale ? (
            <>
              <div className='discount-box'>
                <span className='original-price'>{item.price}&#8362;/{item.unit}</span>
                <span className='sale-price'>{item.finalPrice}&#8362;/{item.unit}</span>
              </div>
            </>
          ) : (
            <span>{item.price}&#8362;/{item.unit}</span>
          )}
        </div>
      </div>
      <div className="counter-box">
        {user ? hovered && (
          <Counter count={count} onChange={handleCountChange} />
        ) : ''}
      </div>

      {modal && <ProductDetails setCount={setCount} item={item} closeModal={() => setModal(false)} />}
    </div>
  );
}

export default ProductCard;