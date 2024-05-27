import { useContext, useEffect, useState } from "react"
import Products from "../product/Products";
import { GeneralContext } from "../../../App";

function Bakery() {
    const [bakery, setBakery] = useState([]);
    const{isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchBakery = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/bakery', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const bakeryData = await response.json();

                setBakery(bakeryData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchBakery();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}>
         <div className="category-container">
            <img src={isSmallScreen?
                'https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Bakery-Mobile-Long1.jpg':
                "https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Bakery-Desktop1.jpg"} 
                alt="bakery-img"/>
                <div className="cover-title">
                    <h1>Bakery</h1>
                </div>
            </div>
          <Products items={bakery}/>
        </div>
    )
}

export default Bakery;
