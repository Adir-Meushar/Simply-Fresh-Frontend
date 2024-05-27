import { useContext, useEffect, useState } from "react"
import Products from "../product/Products";
import { GeneralContext } from "../../../App";

function Fruits() {
    const [fruits, setFruits] = useState([]);
    const{isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchFruits = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/fruits', {
                    credentials: "include",
                    method: "GET",
                    headers: { "Content-type": "application/json", }
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const fruitsData = await response.json();

                setFruits(fruitsData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchFruits();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}>
            <div className="category-container">
               <img src={isSmallScreen
                ?'https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Fruits-Mobile-Long1.jpg':
                "https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Fruits-Desktop1.jpg"} 
                alt="fruits-img" />
                <div className="cover-title">
                    <h1>Fruits</h1>
                    <p>Fresh and wonderful fruits straight from the best farmers, with fast delivery to your door. Here you will find delightful summer fruits, aromatic winter fruits and a large variety of seasonal fruits, every season.</p>
                </div>
            </div>
          <Products items={fruits}/>
        </div>
    )
}

export default Fruits;
