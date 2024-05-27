import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../App";
import moment from 'moment'; 
import { useNavigate } from "react-router-dom";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { PiSmileySadDuotone } from "react-icons/pi";
import './user-orders.css'

function UserOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { snackbar, user, isDarkMode } = useContext(GeneralContext);
    const currentDate = Date.now();
    const navigate = useNavigate();

    useEffect(() => {
        const getMyOrders = async (userId) => {
            try {
                const response = await fetch(`http://localhost:4000/orders/my-orders/${userId}`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });

                const data = await response.json();

                data.sort((a, b) => {
                    const dateA = new Date(moment(a.deliveryDate, 'DD-MM-YYYY'));
                    const dateB = new Date(moment(b.deliveryDate, 'DD-MM-YYYY'));
                    return dateA - dateB;
                });

                setMyOrders(data);

                if (data.error) {
                    console.log(data.error);
                } else {
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        };
        getMyOrders(user._id);
    }, []);

    const handleOrderClick = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const deleteOrder = async (orderId) => {

        if (!window.confirm(`Are you sure you want to remove this order?`)) {
            return;

        } else {
            try {

                const response = await fetch(`http://localhost:4000/orders/delete/${orderId}`, {
                    credentials: "include",
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": localStorage.token,
                    },
                });

                const data = await response.json();

                if (data.error) {
                    console.log(data.error);
                } else {
                    setMyOrders(myOrders.filter((order) => order._id !== orderId));
                    snackbar(`Order Number:${orderId} Was Deleted Successfully!`)
                }
            } catch (error) {
                console.error("Error deliting order:", error);
            }
        }
    }
    
    const isOrderCancelable = (deliveryDate) => {
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
        const parsedDeliveryDate = moment(deliveryDate, 'DD-MM-YYYY').toDate(); 
        const differenceInDays = (parsedDeliveryDate.getTime() - currentDate) / oneDayInMilliseconds;
        return differenceInDays > 0;
    };

    return (
        <div className={`user-orders ${isDarkMode ? 'dark' : ''}`}>
            <h2>My Orders</h2>
            Total orders: {myOrders.length}
            <div className={`orders-box ${myOrders.length>10?'scrolled':''} ` }>
                {myOrders && myOrders.length > 0 ? (
                    myOrders.map((order) => (
                        <div key={order._id} className={`order ${expandedOrder === order._id ? 'expanded' : ''}`}
                            onClick={() => handleOrderClick(order._id)}>
                            <div className="order-info">
                                <div className="order-number">Order Number: <span>{order._id}</span></div>
                                <div className="total-price">Total Price: {order.totalPrice}&#8362;</div>
                                <div >Delivery Schedule: {order.deliveryDate}</div>
                                <div className="created-time">Created Time: {order.createdTime}</div>
                                {isOrderCancelable(order.deliveryDate) ? 
                                <button className="user-order-btn cancel-btn" 
                                onClick={() => deleteOrder(order._id)}>Cancel</button> : 
                                <button className="user-order-btn deliverd-btn" 
                                onClick={()=>deleteOrder(order._id)} >Deliverd</button>}
                            </div>
                            {expandedOrder === order._id && (
                                <>
                                    <h3>Items:</h3>
                                    <div className="items">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="item">
                                                <div className="item-name">{item.productName}</div>
                                                <div className="item-price">Price: {item.sale === false ? item.price : item.finalPrice}&#8362;/{item.unit}</div>
                                                <div className="item-quantity">Quantity: {item.quantity}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-orders">
                        <div className="custom-icon">
                            <PiMagnifyingGlassBold className="magnifying-glass" />
                            <PiSmileySadDuotone className="sad-smiley" />
                        </div>
                        <p>No orders yet... </p>
                        <button className='back-to-shop-btn' onClick={() => navigate('/')}>Start shopping now!</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserOrders;
