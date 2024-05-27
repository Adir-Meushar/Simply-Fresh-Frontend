import { useContext } from "react";
import { GeneralContext } from "../../../App";
import EditUser from "../user-account/EditUser"
import UserOrders from "../orders/UserOrders";
import './my-account.css'

function MyAccount() {
    const { isDarkMode, isSmallScreen } = useContext(GeneralContext);

    return (
        <>
            <div className="category-container">
                <img src={isSmallScreen ? 'https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/mob_category_sales.jpg' : "https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/des_category_sales.jpg"} alt="dishes-img" />
                <div className="cover-title">
                    <h1>User Account</h1>
                </div>
            </div>

            <div className={`user-account ${isDarkMode ? 'dark' : ''}`}>
                <EditUser />
                <UserOrders />
            </div>
        </>

    )
}

export default MyAccount;
