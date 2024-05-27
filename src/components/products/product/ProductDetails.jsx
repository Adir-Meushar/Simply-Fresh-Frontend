import { useContext } from 'react';
import { GeneralContext } from '../../../App';
import './product-styles/product-details.css';
import './product-styles/product-details-responsive.css';

function ProductDetails({ item, closeModal, setCount }) {
  const { user,setCartProducts, snackbar,isDarkMode } = useContext(GeneralContext)

  const handleAddToCart = () => {

    if (!user) {
      return alert('please login in order to purchase..')
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemIndex = cart.findIndex(cartItem => cartItem.id === item._id);
    
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity += 1;
    } else {
      cart.push({
        id: item._id,
        quantity: 1,
        price: item.price,
        finalPrice:item.finalPrice,
        title: item.title,
        img: item.img.url,
        unit: item.unit,
        sale:item.sale
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update count state
    const updatedCartItem = cart.find(cartItem => cartItem.id === item._id);
    setCount(updatedCartItem ? updatedCartItem.quantity : 0);
    setCartProducts(cart);
    snackbar(`One ${item.unit} ${item.title} was added to cart`)
  };

  return (
    <div className="modal-frame-details" onClick={(ev) => { closeModal(false); ev.stopPropagation() }}>
      <div className={`product-details ${isDarkMode ? 'dark' : ''}`} onClick={(ev) => ev.stopPropagation()}>
        <button className='close-btn' onClick={() => closeModal(false)}>&times;</button>
        <h1>{item.title} </h1>
        <div className='content'>
          <div className='img-box'>
            <img src={item.img.url} alt={item.title} className="product-image" />
          </div>
          <div className='details-box'>
            <div className='price'>
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
            <p>{item.description}</p>
            <div className='nutrition-value-box'>
              <h4>Nutritional Information (per 100g)</h4>
              <table>
                <thead>
                  <tr>
                    <th>Calories</th>
                    <th>Carbohydrate</th>
                    <th>Protein</th>
                    <th>Fat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.nutritionalValue.calories}</td>
                    <td>{item.nutritionalValue.carbohydrates}</td>
                    <td>{item.nutritionalValue.protein}</td>
                    <td>{item.nutritionalValue.fat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className='add-btn slide'
          onClick={(ev) => {
            ev.stopPropagation();
            handleAddToCart();
            closeModal(false);
          }}>Add to Cart</button>    
      </div>
    </div>
  )
}

export default ProductDetails
