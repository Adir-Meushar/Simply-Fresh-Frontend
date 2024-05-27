import { useContext, useEffect, useState } from "react"
import Products from "../product/Products";
import './category.css'
import { GeneralContext } from "../../../App";
function Vegetables() {
    const [vegetables, setVegetables] = useState([]);
    const{isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/vegetables', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const vegetablesData = await response.json();

                setVegetables(vegetablesData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchVegetables();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}> 
            <div className="category-container">
                <img src={isSmallScreen?
                    'https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Veg-Mobile-Long1.jpg':
                    "https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Veg-Desktop1.jpg"} 
                    alt="vegetables-img" />
                <div className="cover-title">
                    <h1>Vegetables</h1>
                    <p>An enormous variety of fresh, high-quality, and delicious vegetables, delivered straight to us every morning from the finest farmers in the country with fast home delivery.</p>
                </div>
            </div>
            <Products items={vegetables} />
        </div>
    )
}

export default Vegetables;
