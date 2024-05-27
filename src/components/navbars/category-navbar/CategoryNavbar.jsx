import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GeneralContext } from '../../../App';
import './category-navbar.css'

function CategoryNavbar({handleClick}) {

    const {isDarkMode} = useContext(GeneralContext)

    const location = useLocation();

    const shouldRender = ['/vegetables', '/fruits', '/bakery', '/dairy&eggs','/']

    const shouldRenderUl = shouldRender.includes(location.pathname);

    const ulClass = shouldRenderUl ? 'enabled' : 'disabled';

    return (
        <div>
            <nav className={`category-navbar ${isDarkMode ? 'dark' : ''}`}>
                <ul className={ulClass}>
                    <li><Link onClick={handleClick} to="/vegetables">Vegetables</Link></li>
                    <li><Link onClick={handleClick} to="/fruits">Fruits</Link></li>
                    <li><Link onClick={handleClick} to="/bakery">Bakery</Link></li>
                    <li><Link onClick={handleClick} to="/dairy&eggs">Dairy&eggs</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryNavbar;
