import { Route, Routes, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GeneralContext } from '../../App';
import Vegetables from '../products/category/Vegetables';
import Fruits from '../products/category/Fruits';
import Dashboard from '../../authentication/admin/Dashboard';
import Bakery from '../products/category/Bakery';
import Checkout from '../pages/checkout/Checkout';
import DairyAndEggs from '../products/category/Dairy&Eggs';
import MyAccount from '../../authentication/user/user-account/MyAccount';
import About from '../pages/about/About';
import ErrorPage from '../pages/error-page/ErrorPage';
import QuestionAndAnswer from '../pages/faq/QuestionAndAnswer';
import Contact from '../pages/contact/Contact';
import ProductsOnSale from '../products/category/ProductsOnSale';

export default function Router() {
    const { user, setLoader } = useContext(GeneralContext);
    const location = useLocation();

    useEffect(() => {
        setLoader(true);
        const timeout = setTimeout(() => {
            setLoader(false);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [location, setLoader]);

    return (
        <Routes>
            <Route path="/" element={<ProductsOnSale />} />
            <Route path="/about" element={<About />} />
            <Route path="/f&q" element={<QuestionAndAnswer />} />
            <Route path="/contact" element={<Contact />} />
            {user ? <Route path="/my-account" element={<MyAccount />} /> : ''}
            {user ? <Route path="/dashboard" element={<Dashboard />} /> : ''}
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/bakery" element={<Bakery />} />
            <Route path="/dairy&eggs" element={<DairyAndEggs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
