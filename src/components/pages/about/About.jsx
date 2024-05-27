import React, { useContext } from 'react';
import './about.css';
import { GeneralContext } from '../../../App';

function About() {
    const { isDarkMode, isSmallScreen } = useContext(GeneralContext)

    return (
        <>
            <div className="category-container">
                <img src={isSmallScreen ?
                    'https://noyhasade.b-cdn.net/wp-content/uploads/2024/01/outlet_mob_background.jpeg' :
                    "https://noyhasade.b-cdn.net/wp-content/uploads/2022/12/Des_categroey_outlet.jpg"}
                    alt="dishes-img" />
                <div className="cover-title">
                    <h1>About</h1>
                </div>
            </div>
            <div className={`about-page-container ${isDarkMode ? 'dark' : ''}`}>
                <img className='fig' src="https://noyhasade.co.il/_nuxt/img/fig33.322b8e9.png" alt="fig" />
                <div className="about-container">
                    <div className="about-content">
                        <p>
                            Welcome to Simply Fresh!
                            At Simply Fresh, we understand the importance of fresh, quality groceries in every household. That's why we've curated a selection of the finest basic groceries, focusing on essentials like vegetables, fruits, bakery items, dairy, and eggs, to meet your everyday needs.
                            Our journey began with a simple mission: to provide convenient access to fresh, wholesome produce and pantry staples while ensuring the utmost convenience for our customers. Whether you're a busy parent, a health-conscious individual, or someone who simply appreciates the joy of cooking with high-quality ingredients, we're here to serve you.
                            </p>      
                            <p className='about-note'>**Kindly remember, only registered users can make purchases. Join us today to enjoy the full Simply Fresh experience!</p>      
                    </div>
                    <p className="about-subtitle">Why Choose Us?</p>
                    <ul className="about-list">
                        <li>Freshness Guaranteed: We source our products directly from trusted farmers and suppliers, ensuring that each item is of the highest quality and freshness.</li>
                        <li>Wide Selection: From crisp vegetables to juicy fruits, oven-fresh bakery items to farm-fresh dairy and eggs, we offer a diverse range of products to cater to every taste and preference.</li>
                        <li>Convenience at Your Fingertips: Say goodbye to long grocery lines and heavy shopping bags. With just a few clicks, you can browse, select, and purchase your groceries from the comfort of your home, anytime, anywhere.</li>
                        <li>Exceptional Service: Our team is dedicated to providing you with a seamless shopping experience from start to finish. Have a question or need assistance? Our friendly customer support team is here to help.</li>
                        <li>Community Focus: We're not just a grocery store; we're a part of your community. We strive to build meaningful relationships with our customers and contribute positively to the communities we serve.</li>
                        <li>Whether you're stocking up on essentials, planning your weekly meals, or seeking inspiration for your next culinary adventure, Simply Fresh is here to make grocery shopping a breeze.</li>
                    </ul>
                    <p className="about-thankyou">
                        Thank you for choosing us to be your trusted source for basic groceries. We look forward to serving you and becoming your go-to destination for all your grocery needs.
                    </p>
                    <p className="about-signature">Adir Meushar<br />Founder,Simply Fresh</p>
                </div>
                <img className='pineapple' src="https://noyhasade.co.il/_nuxt/img/ananas.580c50f.png" alt="pineapple" />
            </div>
        </>
    );
}

export default About;
