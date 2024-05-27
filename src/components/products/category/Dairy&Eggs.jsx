import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../../App";
import Products from "../product/Products";

function DairyAndEggs() {
    const [dairyAndEggs, setDairyAndEggs] = useState([]);
    const{isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    useEffect(() => {
        const fetchDairyAndEggs = async () => {
            try {
                const response = await fetch('http://localhost:4000/products/dairy&eggs', {
                    credentials: "include",
                    method: "GET", 
                    headers: { "Content-type": "application/json", }
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const dairyAndEggsData = await response.json();

                setDairyAndEggs(dairyAndEggsData);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchDairyAndEggs();
    }, [])



    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}>
            <div className="category-container">
               <img src={isSmallScreen?
                'https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Refrigerator-milk-and-eggs-Mobile-Long1.jpg':
                "https://noyhasade.b-cdn.net/wp-content/uploads/2022/07/Refrigerator-milk-and-eggs-Desktop1.jpg"} 
                alt="dairy&eggs-img" />
                <div className="cover-title">
                    <h1>Dairy&Eggs</h1>
                </div>
            </div>
          <Products items={dairyAndEggs}/>
        </div>
    )
}

export default DairyAndEggs;
