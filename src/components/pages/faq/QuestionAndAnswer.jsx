import { useContext } from "react"
import { GeneralContext } from "../../../App"
import Faq from 'react-faq-component';
import './faq.css'
function QuestionAndAnswer() {
    const{isDarkMode,isSmallScreen}=useContext(GeneralContext) 

    const data = {
        title: "Have Questions? We Have Answers!",
        rows: [
            {
                title:"How fresh are your vegetables and fruits?",
                content:"Our vegetables and fruits are sourced directly from local farms and reputable suppliers, ensuring maximum freshness. We prioritize quality and freshness in every produce we offer."
            },
            {
                title:"What is the shelf life of your baked goods?",
                content:"Our baked goods are freshly prepared and have varying shelf lives depending on the product. Typically, they have a shelf life of 2-4 days when stored properly. "
            },
            {
                title: "Do you offer seasonal products?",
                content: "Yes, we regularly update our offerings to include seasonal vegetables, fruits, and baked goods. Keep an eye on our website to stay informed about seasonal specials and promotions."
            },
            {
                title: " Do you offer nutritional information for your products?",
                content: "Yes, we provide basic nutritional information for all of our products on their respective product pages. If you have specific dietary concerns or questions, feel free to reach out and contact us for more information"
            },
            {
                title: "Do you have a minimum order requirement?",
                content: "Yes we do, minimum cost for order and delivery is 50₪."
            },
            {
                title: "What payment methods do you accept?",
                content: "We currently accept credit/debit cards, PayPal, and other secure online payment options will be added in the future. You can choose your preferred payment method at checkout"
            },
            {
                title: "How do you ensure the quality of your products during delivery?",
                content: "We take great care in packaging our products to maintain their freshness during transit. Additionally, we work with reliable delivery partners who handle our products with care to ensure they reach you in optimal condition."
            },
            {
                title: "  Can I request specific delivery instructions or time slots?",
                content: "Yes, during the checkout process, you can provide specific delivery instructions or preferences. While we cannot guarantee specific delivery time slots, we will do our best to accommodate your requests whenever possible."
            },
            {
                title: "Do you offer international shipping?",
                content: "At the moment, we only offer shipping within the country. However, we are continuously exploring options to expand our shipping capabilities. Stay tuned for any updates on international shipping."
            },
            {
                title: "Can I cancel my order after it has been placed?",
                content: "We understand that plans can change. If you need to cancel your order, you may do so up to one day before the delivery date."
            },
            {
                title: " How do I contact customer support for assistance?",
                content: "You can reach our customer support team via email, phone, or live chat during our business hours. Visit our Contact Us page for detailed contact information and operating hours."
            }
        ]
    }
    
    return (
        <div className={`main-content ${isDarkMode ? 'dark' : ''}`}>
         <div className="category-container">
            <img src={isSmallScreen?
                'https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/Mob_categroey_FAQ.jpg':
                "https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/Des_categroey_FAQ.jpg"} 
                alt="faq-img"/>
                <div className="cover-title">
                    <h1>FAQ</h1>
                </div>
            </div>

            <div className={`faq ${isDarkMode ? 'dark' : ''}`}>
            <Faq data={data} 
            styles={{
                titleTextColor:isDarkMode ? '#dcdcdc' : 'rgb(38, 64, 34)',
                rowTitleColor: isDarkMode?'#8afaa1': "#258f54",
                rowContentColor:isDarkMode?'#dcdcdc': ' rgb(38, 64, 34)',
                rowContentPaddingBottom:'5px',
                bgColor: 'transparent'
            }}
            />
            </div>
        </div>
    )
}

export default QuestionAndAnswer

