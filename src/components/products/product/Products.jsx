import { useContext, useEffect, useState } from 'react';
import './product-styles/card.css';
import './product-styles/card-responsive.css';
import ProductCard from './ProductCard';
import { GeneralContext } from '../../../App';
import { useLocation } from 'react-router-dom';
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { PiSmileySadDuotone } from "react-icons/pi";
import Message from '../../message/Message';

const Products = ({ items }) => {
  const [sortOption, setSortOption] = useState('low');
  const { search, loader, setSearch, isDarkMode } = useContext(GeneralContext)

  const location = useLocation();

  useEffect(() => {
    setSearch('');
  }, [location.pathname]);

  const handleSortChange = (ev) => {
    setSortOption(ev.target.value);
  };

  const sortItems = (items) => {

    return items && items.length ? items.slice().sort((a, b) => {
      const priceA = a.sale ? a.finalPrice : a.price;
      const priceB = b.sale ? b.finalPrice : b.price;

      if (sortOption === 'low') {
        return priceA - priceB;
      } else if (sortOption === 'high') {
        return priceB - priceA;
      } else if (sortOption === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
    }) : [];
  };

  const filterd = search.length ? sortItems(items).filter(item => item.title.toUpperCase().includes(search.toUpperCase())) : sortItems(items);

  return (
    <>
      <div className={`category-select ${isDarkMode ? 'dark' : ''}`}>
        <select name="" id="" onChange={handleSortChange}>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <div className="grid-container">
        {filterd.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
        {filterd.length === 0 &&
          <div className={`custom-icon-box ${isDarkMode ? 'dark' : ''}`}>
            {loader? <Message>Loading Products Please Wait...</Message>:<Message>Product was not found...</Message>}
            <div className="custom-icon">
              <PiMagnifyingGlassBold className="magnifying-glass" />
              <PiSmileySadDuotone className="sad-smiley" />
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Products;
